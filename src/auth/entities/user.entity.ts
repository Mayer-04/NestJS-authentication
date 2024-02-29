import { Types } from 'mongoose';

export class UserEntity {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
