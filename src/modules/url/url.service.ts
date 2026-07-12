import {
  BadRequestException,
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

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlSchema: Model<Url>,
    private readonly redisService: RedisService,
  ) {}

  async create(urlDto: UrlDto, createdBy: string | undefined) {
    let createRandomUrl = randomBytes(5).toString('hex');

    let findUrl = await this.urlSchema.findOne({ shortUrl: createRandomUrl });
    let index = 0;
    while (findUrl && index < 5) {
      createRandomUrl = randomBytes(5).toString('hex');
      findUrl = await this.urlSchema.findOne({ shortUrl: createRandomUrl });
      index++;
    }
    if (index >= 5) {
      throw new InternalServerErrorException();
    }

    const createUrl = await this.urlSchema.create({
      ...urlDto,
      shortUrl: createRandomUrl,
      createdBy,
    });

    if (!createUrl) throw new InternalServerErrorException();

    this.redisService.set(createUrl.shortUrl, createUrl.originalUrl);

    return createUrl;
  }

  async findUrl(urlParam: UrlParamDto) {
    const cached = await this.redisService.get(urlParam.id);
    if (cached) {
      console.log('🚀 url.service.ts:51 -> cached', cached);
      return cached;
    }

    const findUrl = await this.urlSchema
      .findOne({ shortUrl: urlParam.id })
      .select('originalUrl');
    if (!findUrl) throw new BadRequestException();
    this.redisService.set(urlParam.id, findUrl.originalUrl);
    console.log('🚀 url.service.ts:55 -> findUrl', findUrl);
    return findUrl.originalUrl;
  }
}
