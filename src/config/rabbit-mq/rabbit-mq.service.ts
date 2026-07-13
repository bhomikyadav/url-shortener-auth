import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import amqp from 'amqplib';
@Injectable()
export class RabbitMqService implements OnModuleDestroy {
  protected connection!: amqp.ChannelModel;
  private channel!: amqp.Channel;
  private initialized = false;

  // async onModuleInit() {
  //   console.log(`RabbitMq is started`);
  //   this.connection = await amqp.connect(
  //     `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
  //   );

  //   this.channel = await this.connection.createChannel();

  //   await this.channel.assertQueue('analytics', {
  //     durable: true,
  //   });
  //   console.log('RabbitMq is connected');
  // }

  async connect() {
    console.log(`RabbitMq is started`);

    if (this.initialized) {
      return;
    }

    this.connection = await amqp.connect(
      `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
    );

    this.channel = await this.connection.createChannel();

    this.initialized = true;

    console.log('RabbitMQ Connected');
  }
  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }

  async publish(queue: string, data: unknown) {
    await this.connect();
    await this.channel.assertQueue(queue, {
      durable: true,
    });
    
    console.log('🚀 rabbit-mq.service.ts:50 -> data',data );

    await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  }
  async consume(queue: string, handler: (data: any) => Promise<void>) {
    await this.connect();
    await this.channel.assertQueue(queue, {
      durable: true,
    });

    await this.channel.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());

        await handler(data);

        this.channel.ack(msg);
      } catch (err) {
        this.channel.nack(msg);
      }
    });
  }
}
