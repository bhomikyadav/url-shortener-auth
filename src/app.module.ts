import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './modules/url/url.module';
import { RedisModule } from './modules/redis/redis.module';
import { RabbitMqModule } from './config/rabbit-mq/rabbit-mq.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    UrlModule,
    RedisModule,
    RabbitMqModule,
    AnalyticsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
