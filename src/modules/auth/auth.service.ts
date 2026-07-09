import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from 'src/dto/user/userDto.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/auth/login.dto';

/**
 * Service responsible for authentication flows.
 */
@Injectable()
export class AuthService {
  constructor(
    protected readonly userService: UsersService,
    protected readonly jwt: JwtService,
  ) {}

  // 1. Generate both tokens at login/signup
  async getTokens(userId: string, name: string) {
    const payload = { sub: userId, name };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY_ACCESS_TOKEN || 'access_secret',
        expiresIn: '15m',
      }),
      this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY_REFRESH_TOKEN || 'refresh_secret',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  // 2. Validate refresh token & issue a new access token
  async refreshTokens(userId: string, refreshToken: string) {
    // Note: In real production, verify 'refreshToken' matches a hashed
    // version stored in your DB for this userId before proceeding!

    // Example database check pseudo-code:
    // const user = await this.usersService.findOne(userId);
    // if (!user || user.hashedRefreshToken !== refreshToken) throw new ForbiddenException();

    return this.getTokens(userId, 'username_from_db');
  }

  /**
   * Register a new user and return a signed JWT.
   * @param userDto - User registration payload.
   */
  async register(userDto: UserDto) {
    // Log incoming payload for debugging purposes
    console.log('🚀 auth.service.ts:17 -> userDto', userDto);

    // Check if the email is already registered
    const findUserByEmail = await this.userService.findUser(
      { email: userDto.email },
      {},
    );
    if (findUserByEmail.length)
      throw new HttpException('User Already Registered.', 409);

    // Generate a salt and hash the password before storing it
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    console.log('🚀 auth.service.ts:22 -> salt', salt);
    const hashPass = await bcrypt.hash(userDto.password, salt);

    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });

    const payload = {
      sub: newUser._id,
      name: newUser.name,
    };

    // Sign a JWT for the newly registered user
    const { accessToken, refreshToken } = await this.getTokens(
      newUser._id.toString(),
      newUser.name,
    );

    await this.userService.update(
      { _id: newUser._id.toString() },
      { refreshToken },
    );
    return { accessToken, refreshToken };
  }

  /**
   * Authenticate a user and return a signed JWT.
   * @param loginDto - User login credentials.
   */
  async login(loginDto: LoginDto) {
    // Find the user by email
    const findUser = await this.userService.findUser(
      { email: loginDto.email },
      {},
    );

    if (!findUser.length) throw new UnauthorizedException();

    // Validate the provided password against the stored hash
    const isValidPass = await bcrypt.compare(
      loginDto.password,
      findUser.at(0)?.password!,
    );

    if (!isValidPass) throw new UnauthorizedException();

    const payload = {
      sub: findUser.at(0)?._id,
      name: findUser.at(0)?.name,
    };

    // Sign a JWT for the authenticated user
    const { accessToken, refreshToken } = await this.getTokens(
      findUser.at(0)?._id.toString()!,
      findUser.at(0)?.name!,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
