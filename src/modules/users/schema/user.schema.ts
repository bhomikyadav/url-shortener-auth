import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'node:crypto';

export type UserDocumentation = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    default: () => {
      return randomUUID();
    },
  })
  guid!: string;

  @Prop({
    default: '',
  })
  refreshToken!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
