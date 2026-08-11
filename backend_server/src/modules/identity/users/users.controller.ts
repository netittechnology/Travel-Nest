import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserEntity, UserRole } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { UserResponse } from '../types/user-response.types';
import { RequestEmailDto, ResetPasswordDto } from './dto/reset-password.dto';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { UpdateUserRoleDto } from './dto/user-update.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllUsers(
        @Query() query: FindUsersQueryDto,
    ): Promise<PaginatedResponse<UserResponse>> {
        return await this.userService.findAllUsers(query);
    }

    // password routes
    @Post('reset-link')
    @HttpCode(HttpStatus.OK)
    async sendResetLink(
        @Body() dto: RequestEmailDto,
    ): Promise<any> {
        await this.userService.sendResetPasswordLink(dto);
        return {
            message: "If an account exists with that email, a reset link has been sent to your email"
        };
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    async resetPassword(
        @Body() dto: ResetPasswordDto,
    ): Promise<any> {
        await this.userService.resetPassword(dto);
        return {
            message: "Password has been reset successfully"
        };
    }


    // user routes
    @Put(':user_id/change-role')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateUserRole(
        @Param('user_id', ParseIntPipe, UserExistsPipe) account: UserEntity,
        @Body() dto: UpdateUserRoleDto,
        @CurrentUser() user: UserEntity,
    ): Promise<UserResponse> {
        return await this.userService.updateUserRole(account, dto, user);
    }

    @Put(':user_id/toggle-status')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleUserStatus(
        @Param('user_id', ParseIntPipe, UserExistsPipe) user: UserEntity,
    ): Promise<UserResponse> {
        return await this.userService.toggleUserStatus(user);
    }

    @Get(':user_id')
    @HttpCode(HttpStatus.OK)
    async getUserById(
        @Param('user_id', ParseIntPipe) user_id: number,
    ): Promise<UserResponse> {
        return await this.userService.findUserById(user_id);
    }
}
