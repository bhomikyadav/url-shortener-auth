import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import amqp from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    const connection = await amqp.connect('http://localhost:15672');
    connection.on('connection', () => {
      console.log('RabbitMq is connected');
    });
    const channel = await connection.createChannel();
  }
  onModuleDestroy() {}
}
