import { BaseUser } from './base-user-dto.dto';
export class CreateUserDto extends BaseUser {
  createdAt: Date;
}
