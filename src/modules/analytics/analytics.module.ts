import { Module, OnModuleInit } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { RabbitMqModule } from 'src/config/rabbit-mq/rabbit-mq.module';
import { RabbitMqService } from 'src/config/rabbit-mq/rabbit-mq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Analytics, AnalyticsSchema } from 'src/schema/analytics.schema';

@Module({
  imports: [
    RabbitMqModule,

    MongooseModule.forFeature([
      { name: Analytics.name, schema: AnalyticsSchema },
    ]),
  ],
  providers: [AnalyticsService, RabbitMqService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
