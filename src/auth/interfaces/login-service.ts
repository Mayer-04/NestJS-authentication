import { UserEntity } from '../entities/user.entity';

export interface LoginServiceResponse {
  user: UserEntity;
  token: string;
  isMatch: boolean;
}
