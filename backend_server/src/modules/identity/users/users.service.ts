import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CommunicationService } from '../../communication/communication.service';
import { UserResponse } from '../types/user-response.types';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { UpdateUserRoleDto } from './dto/user-update.dto';
import { RequestEmailDto, ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

const EXACT_FILTER_MAP: Partial<Record<keyof FindUsersQueryDto, string>> = {
    is_active: 'user.is_active',
    role: 'user.role',
};


@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private readonly configService: ConfigService,
        private readonly communicationService: CommunicationService,
    ) { }

    async onModuleInit() {
        await this.createDefaultAdmin();
    }

    private async createDefaultAdmin(): Promise<void> {
        const name = this.configService.get<string>('admin.name')
            ?? 'Super Admin';

        const email = this.configService.get<string>('admin.email')
            ?? 'admin@example.com';

        const password = this.configService.get<string>('admin.password')
            ?? this.generateRandomPassword();

        const normalizedEmail = String(email.toLocaleLowerCase().trim());
        const normalizedPassword = String(password.trim());

        const existingAdmin = await this.userRepository.existsBy({
            email: normalizedEmail,
        });

        if (existingAdmin) {
            this.logger.log(`Admin account already exists with Email: ${normalizedEmail}`);
            return;
        }

        const hashedPassword = await this.hashPassword(normalizedPassword);
        const admin = this.userRepository.create({
            email: normalizedEmail,
            name: name,
            password: hashedPassword,
            role: UserRole.SUPER_ADMIN,
            must_change_password: true,
        });

        await this.userRepository.save(admin);
        this.logger.log(`Admin account created with Email: ${normalizedEmail}`);
    }


    // user methods
    async findUserById(user_id: number): Promise<UserResponse> {
        const user = await this.userRepository.findOne({
            where: { id: user_id }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return new UserResponse(user);
    }

    async findAllUsers(query: FindUsersQueryDto): Promise<PaginatedResponse<UserResponse>> {
        const { page = 1, limit = 10, search_term, sort_order = 'DESC' } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.userRepository
            .createQueryBuilder('user');

        if (search_term) {
            queryBuilder.andWhere(
                `(
                user.name   LIKE :search OR 
                user.email  LIKE :search
                )`,
                { search: `%${search_term}%` }
            );
        }

        for (const [key, column] of Object.entries(EXACT_FILTER_MAP)) {
            const value = query[key as keyof FindUsersQueryDto];
            if (value != null) {
                queryBuilder.andWhere(`${column} = :${key}`, { [key]: value });
            }
        }

        queryBuilder
            .addOrderBy(
                `CASE 
                    WHEN user.role = 'SUPER_ADMIN' THEN 1 
                    WHEN user.role = 'ADMIN' THEN 2 
                    WHEN user.role = 'USER' THEN 3
                    ELSE 4 
                END`,
                'ASC'
            )
            .addOrderBy('user.created_at', sort_order)
            .addOrderBy('user.name', 'ASC')
            .skip(skip)
            .take(limit);

        const [items, totalItems] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);

        return {
            items: items.map(user => new UserResponse(user)),
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages
            }
        };
    }

    async updateUserRole(account: UserEntity, dto: UpdateUserRoleDto, user: UserEntity): Promise<UserResponse> {
        if (user.id === account.id) {
            throw new BadRequestException('You cannot change your own account role');
        }

        await this.userRepository.manager.transaction(async (manager) => {
            await manager.increment(UserEntity, { id: account.id }, 'token_version', 1);

            await manager.update(UserEntity, account.id, {
                role: dto.role,
                must_change_password: true,
            });
        });

        const updatedAccount = await this.userRepository.findOne({ where: { id: account.id } });
        if (!updatedAccount) throw new NotFoundException('User not found');

        return new UserResponse(updatedAccount);
    }

    async toggleUserStatus(user: UserEntity): Promise<UserResponse> {
        await this.userRepository.manager.transaction(async (manager) => {
            await manager.increment(UserEntity, { id: user.id }, 'token_version', 1);

            await manager
                .createQueryBuilder()
                .update(UserEntity)
                .set({ is_active: () => 'NOT is_active' })
                .where('id = :id', { id: user.id })
                .execute();
        });

        const updatedAccount = await this.userRepository.findOne({ where: { id: user.id } });
        if (!updatedAccount) throw new NotFoundException('User not found');

        return new UserResponse(updatedAccount);
    }


    // reset password methods
    async sendResetPasswordLink(dto: RequestEmailDto): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
        });

        if (!user) {
            this.logger.warn(
                `Password reset requested for non-existent email: ${dto.email}`,
            );

            await new Promise(resolve => setTimeout(resolve, 100));
            return;
        }

        const rawToken = crypto.randomBytes(32).toString('hex');

        const tokenHash = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex');

        await this.userRepository.update(user.id, {
            temp_token: tokenHash,
            temp_token_expires: new Date(Date.now() + 15 * 60 * 1000),
        });

        try {
            await this.communicationService.sendResetPasswordToken(
                user.email,
                rawToken,
            );

            this.logger.log(
                `Password reset email successfully sent to: ${user.email}`,
            );
        } catch (error) {
            this.logger.error(
                `Failed to send reset email to: ${user.email}`,
                error instanceof Error ? error.stack : String(error),
            );

            // Clear reset token if email sending fails
            await this.userRepository.update(
                {
                    id: user.id,
                    temp_token: tokenHash,
                },
                {
                    temp_token: null,
                    temp_token_expires: null,
                },
            );

            // IMPORTANT: tell controller/frontend that email failed
            throw new BadRequestException(
                'Unable to send password reset email. Please try again later.',
            );
        }
    }
    async resetPassword(dto: ResetPasswordDto): Promise<void> {
        const tokenHash = crypto.createHash('sha256').update(dto.token).digest('hex');
        const hashedPassword = await this.hashPassword(dto.newPassword);

        await this.userRepository.manager.transaction(async (manager) => {
            const user = await manager.findOne(UserEntity, {
                where: { temp_token: tokenHash },
                lock: { mode: 'pessimistic_write' },
            });

            if (!user) {
                throw new ForbiddenException('Invalid or expired token');
            }

            if (user.temp_token_expires && user.temp_token_expires < new Date()) {
                throw new ForbiddenException('Invalid or expired token');
            }

            await manager.increment(UserEntity, { id: user.id }, 'token_version', 1);

            await manager.update(UserEntity, user.id, {
                password: hashedPassword,
                must_change_password: false,
                temp_token: null,
                temp_token_expires: null,
            });
        });
    }


    // helper methods
    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private generateRandomPassword(): string {
        return crypto.randomBytes(32).toString('hex');
    }
}
