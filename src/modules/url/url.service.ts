import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { UrlDto } from 'src/dto/url/urlDto.dto';
import { UrlParamDto } from 'src/dto/url/urlParamDto.dto';
import { Url } from 'src/schema/url.schema';
import { RedisService } from '../redis/redis.service';
import { RabbitMqService } from 'src/config/rabbit-mq/rabbit-mq.service';
import { Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';
import moment from 'moment';
import { RedisObjectT } from 'src/types/redis/redis';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlSchema: Model<Url>,
    private readonly redisService: RedisService,
    private readonly rabbitMq: RabbitMqService,
  ) {}

  async create(urlDto: UrlDto, createdBy: string | undefined) {
    const { customUrl, expiresIn, isActive } = urlDto;
    let createRandomUrl = customUrl || randomBytes(5).toString('hex');

    let findUrl = await this.urlSchema.findOne({ shortUrl: createRandomUrl });

    if (customUrl && findUrl)
      throw new ConflictException('Custom Url Already Taken');

    let index = 0;
    while (findUrl && index < 5) {
      createRandomUrl = randomBytes(5).toString('hex');
      findUrl = await this.urlSchema.findOne({ shortUrl: createRandomUrl });
      index++;
    }
    if (index >= 5) {
      throw new InternalServerErrorException();
    }

    const timeType = expiresIn.slice(
      -1,
    ) as moment.unitOfTime.DurationConstructor;
    const time = Number(expiresIn.slice(0, -1));

    let expireTime = moment().add(time, timeType).valueOf();

    const createUrl = await this.urlSchema.create({
      ...urlDto,
      shortUrl: createRandomUrl,
      createdBy,
      expireTime,
      isActive,
    });

    if (!createUrl) throw new InternalServerErrorException();

    this.redisService.set(createUrl.shortUrl, {
      originalUrl: createUrl.originalUrl,
      isActive,
      expireTime,
    });

    return createUrl;
  }

  async findUrl(urlParam: UrlParamDto, req: Request) {
    const cached = JSON.parse((await this.redisService.get(urlParam.id)) || '');

    if (!cached?.isActive! || moment.now() > cached?.expireTime) {
      throw new ForbiddenException();
    }

    const parser = new UAParser(req.headers['user-agent']);

    console.log(
      '🚀 url.service.ts:58 ->req.headers[user-agent] =>',
      req.headers['user-agent'],
    );
    const dataForMq = {
      shortUrl: urlParam.id,
      ip: req.ip,
      browser: parser.getBrowser().name,
      os: parser.getOS().name,
      device: parser.getDevice().type || 'desktop',
      clickedAt: new Date(),
    };

    this.rabbitMq.publish('analytics', dataForMq);
    if (cached) {
      console.log('🚀 url.service.ts:51 -> cached', cached);
      return cached.originalUrl;
    }

    const findUrl = await this.urlSchema
      .findOne({ shortUrl: urlParam.id })
      .select('originalUrl');
    if (!findUrl) throw new BadRequestException();
    this.redisService.set(urlParam.id, {
      originalUrl: findUrl.originalUrl,
      expireTime: findUrl.expireTime,
      isActive: findUrl.isActive,
    });
    console.log('🚀 url.service.ts:55 -> findUrl', findUrl);
    return findUrl.originalUrl;
  }
}
