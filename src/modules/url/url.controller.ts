import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessTokenStrategy } from '../auth/jwtAccessToken.strategy';
import { UrlDto } from 'src/dto/url/urlDto.dto';
import { UrlService } from './url.service';
import { AccessTokenGuard } from 'src/common/guard/access-token/access-token.guard';
import type { Request, Response } from 'express';
import { UrlParamDto } from 'src/dto/url/urlParamDto.dto';

type AuthenticatedRequest = Request & {
  user?: {
    sub: string;
    name: string;
  };
};

@UseGuards(JwtAccessTokenStrategy)
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  async createUrl(@Body() urlDto: UrlDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return this.urlService.create(urlDto, userId);
  }

  @Get(`:id`)
  async fetchUrl(
    @Param() param: UrlParamDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    console.log('🚀 url.controller.ts:47 -> param ', param);
    const originalUrl = await this.urlService.findUrl(param, req);
    if (!originalUrl) throw new InternalServerErrorException();
    console.log('🚀 url.controller.ts:48 -> originalUrl', originalUrl);
    return res.redirect(originalUrl);
  }
}
