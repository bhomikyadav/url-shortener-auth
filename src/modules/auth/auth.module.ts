import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAccessTokenStrategy } from './jwtAccessToken.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [AuthService, JwtService, JwtAccessTokenStrategy, UsersService],
  controllers: [AuthController],
  exports: [JwtAccessTokenStrategy, PassportModule],
})
export class AuthModule {}
