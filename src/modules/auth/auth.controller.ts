import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dto/user/userDto.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/auth/login.dto';

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
}
