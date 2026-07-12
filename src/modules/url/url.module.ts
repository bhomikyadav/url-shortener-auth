import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { JwtAccessTokenStrategy } from '../auth/jwtAccessToken.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/schema/url.schema';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
    ]),
    RedisModule,
  ],
  controllers: [UrlController],
  providers: [MongooseModule, UrlService, JwtAccessTokenStrategy, RedisService],
})
export class UrlModule {}
