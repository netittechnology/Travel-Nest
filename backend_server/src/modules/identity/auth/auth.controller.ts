import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/user-register.dto';
import { LoginThrottlerGuard } from './guards/login-throttler.guard';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity, UserRole } from '../entities/user.entity';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    private getCookieOptions() {
        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
        
        const adminPanelUrl = isProduction
            ? this.configService.get<string>('origins.production.admin_panel')
            : this.configService.get<string>('origins.development.admin_panel');

        const userPanelUrl = isProduction
            ? this.configService.get<string>('origins.production.client_panel')
            : this.configService.get<string>('origins.development.client_panel');

        let domain: string | undefined;

        if (isProduction && adminPanelUrl && userPanelUrl) {
            try {
                const adminHost = new URL(adminPanelUrl).hostname;
                const userHost = new URL(userPanelUrl).hostname;

                const rootDomain = (hostname: string) => hostname.split('.').slice(-2).join('.');

                const adminRoot = rootDomain(adminHost);
                const userRoot = rootDomain(userHost);

                if (adminRoot !== userRoot) {
                    this.logger.warn(
                        `Admin panel root domain (${adminRoot}) and client panel root domain (${userRoot}) differ — cookie domain scoping skipped`,
                    );
                } else {
                    domain = `.${adminRoot}`;
                }
            } catch (error) {
                this.logger.warn('Failed to parse domain for cookies', error);
            }
        }

        return {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax' as const,
            path: '/',
            domain,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body() dto: RegisterUserDto,
    ): Promise<any> {
        const result = await this.authService.register(dto);
        return {
            message: 'User registration successful',
            result
        };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LoginThrottlerGuard)
    async login(
        @Body() dto: LoginUserDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        const result = await this.authService.login(dto);

        res.cookie('refreshToken', result.refreshToken, this.getCookieOptions());

        return {
            message: "Login successful",
            accessToken: result.accessToken,
            user: result.user
        };
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        const refreshToken = req.cookies['refreshToken'];

        const result = await this.authService.refreshToken(refreshToken);

        res.cookie('refreshToken', result.refreshToken, this.getCookieOptions());

        return { 
            message: "Token refreshed successfully",
            accessToken: result.accessToken,
            user: result.user
        };
    }

    @Get('check-auth')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async checkAuth(
        @CurrentUser() user: UserEntity,
    ): Promise<any> {
        return await this.authService.checkAuth(user.id);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(
        @Res({ passthrough: true }) res: Response
    ): Promise<any> {
        res.clearCookie('refreshToken', this.getCookieOptions());
        return { 
            message: "Logged out successfully",
            user: null
        };
    }


    //-----------Google OAuth routes-----------------------------------
    @Get('google')
    @HttpCode(HttpStatus.OK)
    async googleOAuth(
        @Res() res: Response,
    ): Promise<any> {
        const url = await this.authService.googleOAuthStart();
        res.redirect(url);
    }

    @Get('google/callback')
    @HttpCode(HttpStatus.OK)
    async googleAuthCallback(
        @Query('code') code: string,
        @Res() res: Response,
    ): Promise<any> {
        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

        const adminPanelUrl = isProduction
            ? this.configService.get<string>('origins.production.admin_panel')
            : this.configService.get<string>('origins.development.admin_panel');

        const userPanelUrl = isProduction
            ? this.configService.get<string>('origins.production.client_panel')
            : this.configService.get<string>('origins.development.client_panel');

        // default fallback for the "no code" case, before we know who the user is
        const fallbackUrl = userPanelUrl;

        if (!code) {
            return res.redirect(`${fallbackUrl}/login?google_auth=error&message=No authorization code provided`);
        }

        try {
            const result = await this.authService.googleAuthCallback(code);

            const isAdmin = result.user.role === UserRole.ADMIN || result.user.role === UserRole.SUPER_ADMIN;
            const targetUrl = isAdmin ? adminPanelUrl : userPanelUrl;

            res.cookie('refreshToken', result.refreshToken, this.getCookieOptions());

            return res.redirect(`${targetUrl}/login?google_auth=success`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
            const encodedMessage = encodeURIComponent(errorMessage);

            const userRole = (error as any)?.userRole;
            const isAdminError = userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;
            const errorRedirectUrl = isAdminError ? adminPanelUrl : fallbackUrl;
            
            return res.redirect(`${errorRedirectUrl}/login?google_auth=error&message=${encodedMessage}`);
        }
    }
}
