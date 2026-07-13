import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnalyticsDocumentation = HydratedDocument<Analytics>;

@Schema({
  timestamps: true,
})
export class Analytics {
  @Prop({
    required: true,
  })
  shortUrl!: string;

  @Prop({
    required: true,
  })
  ip!: string;

  @Prop({
    required: true,
  })
  browser!: string;

  @Prop({
    required: true,
  })
  device!: string;

  @Prop({
    required: true,
  })
  os!: string;

  @Prop({
    required: true,
  })
  clickedAt!: string;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
