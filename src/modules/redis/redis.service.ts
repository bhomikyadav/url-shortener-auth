import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClient, RedisClientType } from 'redis';
import { RedisObjectT } from 'src/types/redis/redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient!: RedisClientType;
  private readonly ttl: number = 60;
  constructor() {}
  async onModuleInit() {
    this.redisClient = createClient({
      url: process.env.REDIS_CLIENT,
    });
    this.redisClient.on('connect', () => {
      console.log('Connecting to Redis...');
    });

    this.redisClient.on('ready', () => {
      console.log('Redis connected successfully');
    });

    this.redisClient.on('reconnecting', () => {
      console.warn('Redis reconnecting...');
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis error', err);
    });

    this.redisClient.on('end', () => {
      console.warn('Redis connection closed');
    });

    await this.redisClient.connect();
  }
  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  async set(key: string, value: RedisObjectT, ttl: number = 60 * 1000) {
    const addToRedis = await this.redisClient.set(key, JSON.stringify(value), {
      EX: ttl,
    });

    return addToRedis;
  }
  async get(key: string) {
    const getData =await this.redisClient.get(key);
    return getData;
  }
}
