import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleOAuthModule } from './auth/google/google.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { RolesGuard } from './auth/guards/roles.guard';
import { LoginAttemptService } from './auth/services/login-attempt.service';
import { LoginThrottlerGuard } from './auth/guards/login-throttler.guard';
import { CommunicationModule } from '../communication/communication.module';
import { UserExistsPipe } from './users/pipes/user-exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({}),
    GoogleOAuthModule,
    CommunicationModule,
  ],
  controllers: [
    AuthController, 
    UsersController,
  ],
  providers: [
    AuthService, 
    UsersService,
    JwtStrategy,
    RolesGuard,
    LoginAttemptService,
    LoginThrottlerGuard,
    UserExistsPipe,
  ],
  exports: [
    AuthService, 
    UsersService, 
    RolesGuard,
  ]
})
export class IdentityModule {}
