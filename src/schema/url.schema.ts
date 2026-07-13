import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UrlDocumentation = HydratedDocument<Url>;

@Schema({
  timestamps: true,
})
export class Url {
  @Prop({
    required: true,
  })
  shortUrl!: string;

  @Prop({
    required: true,
  })
  originalUrl!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'users',
    required: true,
  })
  createdBy!: string;

  @Prop({
    required: true,
  })
  expireTime!: number;

  @Prop({
    required: true,
  })
  isActive!: boolean;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
