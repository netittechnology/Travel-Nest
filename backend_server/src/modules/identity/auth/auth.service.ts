import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from '../entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleOAuthService } from './google/google.service';
import { LoginAttemptService } from './services/login-attempt.service';
import { RegisterUserDto } from './dto/user-register.dto';
import { UserResponse } from '../types/user-response.types';
import { LoginUserDto } from './dto/user-login.dto';
import { AuthResponse, JwtPayload } from '../types/auth-response.types';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>,

        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly googleOAuthService: GoogleOAuthService,
        private readonly loginAttemptService: LoginAttemptService,
    ) {}

    async register(dto: RegisterUserDto): Promise<UserResponse> {
        const { role, password, ...restDto } = dto;

        const existingUser = await this.authRepository.existsBy({ email: dto.email });
        if (existingUser) throw new ConflictException('Email already in use');

        const hashedPassword = await this.hashPassword(password);

        const user = this.authRepository.create({
            ...restDto,
            password: hashedPassword,
            role: role ?? UserRole.USER,
            must_change_password: 
                role === UserRole.SUPER_ADMIN ||  
                role === UserRole.ADMIN,
        });

        try {
            const newUser = await this.authRepository.save(user);
            return new UserResponse(newUser);
        } catch (error) {
            if (error instanceof QueryFailedError && (error as any).code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Email already in use');
            }
            throw error;
        }
    }

    async login(dto: LoginUserDto): Promise<AuthResponse> {
        const user = await this.authRepository.findOne({
            where: { email: dto.email }
        });

        if (!user || user.email !== dto.email) {
            this.loginAttemptService.recordFailedAttempt(dto.email);
            throw new UnauthorizedException('Invalid Email');
        }

        const isValid = await this.verifyPassword(dto.password, user.password);
        if (!isValid) {
            const result = this.loginAttemptService.recordFailedAttempt(dto.email);
            
            if (result.blocked) {
                throw new HttpException(
                    { message: result.message, retryAfter: result.retryAfter },
                    HttpStatus.TOO_MANY_REQUESTS,
                );
            }
            
            throw new UnauthorizedException('Invalid Password');
        } 

        this.validateLogin(user);

        // Successful login — clear attempt history
        this.loginAttemptService.clearRecord(dto.email);

        await this.authRepository.increment({ id: user.id }, 'token_version', 1);

        const updatedUser = await this.authRepository.findOne({ where: { id: user.id } });
        if (!updatedUser) throw new UnauthorizedException('Invalid Credentials');

        return {
            user: new UserResponse(updatedUser),
            accessToken: this.generateAccessToken(updatedUser),
            refreshToken: this.generateRefreshToken(updatedUser),
        };
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const payload = this.verifyRefreshToken(refreshToken);
        const user = await this.authRepository.findOne({
            where: { id: payload.sub }
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.token_version !== payload.tokenVersion) {
            throw new UnauthorizedException('Token has been revoked');
        }

        await this.authRepository.increment({ id: user.id }, 'token_version', 1);

        const updatedUser = await this.authRepository.findOne({ where: { id: user.id } });
        if (!updatedUser) throw new UnauthorizedException('User not found');

        return {
            user: new UserResponse(updatedUser),
            accessToken: this.generateAccessToken(updatedUser),
            refreshToken: this.generateRefreshToken(updatedUser),
        };
    }

    async checkAuth(user_id: number): Promise<UserResponse> {
        const user = await this.authRepository.findOne({
            where: { id: user_id }
        });

        if (!user) throw new UnauthorizedException('User not found');

        return new UserResponse(user);
    }


    // googleOAuth
    async googleOAuthStart(): Promise<string> {
        return await this.googleOAuthService.getAuthUrl();
    }

    async googleAuthCallback(code: string): Promise<AuthResponse> {
        const payload = await this.googleOAuthService.authenticateUser(code);
        if (!payload) {
            throw new UnauthorizedException('No authorization code provided');
        }

        if (!payload.email) {
            throw new UnauthorizedException('Email not provided by Google');
        }

        let user = await this.authRepository.findOne({
            where: { email: payload.email }
        });

        if (!user) {
            const randomPassword = this.generateRandomPassword();
            const hashedPassword = await this.hashPassword(randomPassword);

            const newUser = this.authRepository.create({
                email: payload.email,
                name: payload.username ?? payload.email.split('@')[0],
                password: hashedPassword,
                role: UserRole.USER,
                google_id: payload.googleId,
                must_change_password: false,
            });

            try {
                user = await this.authRepository.save(newUser);
            } catch (error) {
                if (error instanceof QueryFailedError && (error as any).code === 'ER_DUP_ENTRY') {
                    throw new ConflictException('Email already in use');
                }
                throw error;
            }
        }

        try {
            this.validateLogin(user);
        } catch (error) {
            if (error instanceof HttpException) {
                (error as any).userRole = user.role;
            }
            throw error;
        }

        // Link google_id if not already linked
        if (!user.google_id && payload.googleId) {
            await this.authRepository.update(user.id, { google_id: payload.googleId });
        }

        await this.authRepository.increment({ id: user.id }, 'token_version', 1);

        const updatedUser = await this.authRepository.findOne({ where: { id: user.id } });
        if (!updatedUser) throw new UnauthorizedException('User not found');
        
        return {
            user: new UserResponse(updatedUser),
            accessToken: this.generateAccessToken(updatedUser),
            refreshToken: this.generateRefreshToken(updatedUser),
        };
    }


    // helper methods
    async findById(user_id: number): Promise<UserResponse | null> {
        const user = await this.authRepository.findOne({
            where: { id: user_id }
        });

        if (!user) return null;

        return new UserResponse(user);
    }


    // helpers
    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    private validateLogin(user: UserEntity): void {
        if (!user.is_active) {
            throw new UnauthorizedException('Your account is inactivated');
        }

        if (user.must_change_password) {
            throw new UnauthorizedException(`You need to reset your password. Go to "Forgot password ?" and reset your password`);
        }
    }

    private generateAccessToken(user: UserEntity): string {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            tokenVersion: user.token_version,
        };

        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '1h',
        });
    }

    private generateRefreshToken(user: UserEntity): string {
        const payload: JwtPayload = {
            sub: user.id,
            tokenVersion: user.token_version,
        };

        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '7d',
        });
    }

    private verifyRefreshToken(refreshToken: string): JwtPayload {
        const payload = this.jwtService.verify(refreshToken, {
            secret: this.configService.get<string>('JWT_SECRET')
        });

        if (!payload) {
            throw new UnauthorizedException('Invalid token');
        }

        return payload;
    }

    private generateRandomPassword(): string {
        return crypto.randomBytes(32).toString('hex');
    }
}
