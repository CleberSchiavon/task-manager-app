import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseUser {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches('password')
  confirmPassword?: string;
}
