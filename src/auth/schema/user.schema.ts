import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
