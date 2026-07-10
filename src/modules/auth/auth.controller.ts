import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
// Highlight-start
import type { Request } from 'express';
// Highlight-end
import { UserDto } from 'src/dto/user/userDto.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RefreshTokenGuard } from 'src/common/guard/refresh-token/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    console.log('🚀 auth.controller.ts:26 -> req.user', req.user);

    return this.authService.refreshTokens(req.user, req.refreshToken!);
  }
}
