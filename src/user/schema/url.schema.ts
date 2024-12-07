import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Url extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  originalLink: string;

  @Prop({ unique: true })
  shortenedLink: string;

  @Prop()
  customLink?: string;

  @Prop()
  qrCode?: string;

  @Prop({ default: 0 })
  clickCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.index({ shortenedLink: 1 }, { unique: true });