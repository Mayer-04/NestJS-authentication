import { Types } from 'mongoose';

interface Response {
  _id: Types.ObjectId;
  name: string;
  email: string;
}
export interface LoginControllerResponse {
  user: Response;
  token: string;
}
