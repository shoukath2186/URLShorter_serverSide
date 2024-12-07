import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    userName: string;
  
    @Prop({ required: true })
    email: string;
  
    @Prop({})
    password: string;
  
    @Prop({ default: 'https://github.com/shadcn.png' })
    image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash the user's password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });