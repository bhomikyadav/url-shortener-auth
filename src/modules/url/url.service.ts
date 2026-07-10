import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { UrlDto } from 'src/dto/url/url.dto';
import { Url } from 'src/schema/url.schema';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private readonly urlSchema: Model<Url>) {}

  async create(urlDto: UrlDto, createdBy: string) {
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
    return this.urlSchema.create({ ...urlDto, shortUrl: createRandomUrl });
  }
}
