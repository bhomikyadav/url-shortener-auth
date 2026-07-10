import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { JwtAccessTokenStrategy } from '../auth/jwtAccessToken.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/schema/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
    ]),
  ],
  controllers: [UrlController],
  providers: [MongooseModule, UrlService, JwtAccessTokenStrategy],
})
export class UrlModule {}
