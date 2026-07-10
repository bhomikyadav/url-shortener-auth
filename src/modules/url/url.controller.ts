import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessTokenStrategy } from '../auth/jwtAccessToken.strategy';
import { UrlDto } from 'src/dto/url/url.dto';
import { UrlService } from './url.service';
import { AccessTokenGuard } from 'src/common/guard/access-token/access-token.guard';
import type { Request } from 'express';

@UseGuards(JwtAccessTokenStrategy)
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  async createUrl(@Body() urlDto: UrlDto, @Req() req: Request) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException();
    }

    return this.urlService.create(urlDto, req.user.sub);
  }
}
