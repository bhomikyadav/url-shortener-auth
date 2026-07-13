import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RabbitMqService } from 'src/config/rabbit-mq/rabbit-mq.service';
import { Analytics, AnalyticsSchema } from 'src/schema/analytics.schema';

@Injectable()
export class AnalyticsService implements OnModuleInit {
  constructor(
    private readonly rabbitmq: RabbitMqService,
    @InjectModel(Analytics.name)
    private readonly analyticsSchema: Model<Analytics>,
  ) {}

  onModuleInit() {
    this.rabbitmq.consume('analytics', async (data) => {
      await this.saveAnalytics(data);
    });
  }

  async saveAnalytics(data: any) {
    await this.analyticsSchema.create(data);
  }
}
