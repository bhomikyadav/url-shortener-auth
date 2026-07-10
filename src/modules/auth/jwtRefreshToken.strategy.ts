import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshTOkenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY_REFRESH_TOKEN!,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: any) {
    const [type, refreshToken] = req.headers['authorization']?.split(' ') ?? [];
    req['refreshToken'] = refreshToken;
    return payload;
  }
}
