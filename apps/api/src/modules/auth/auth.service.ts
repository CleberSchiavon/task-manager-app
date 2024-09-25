import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'modules/users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByUsername(createUserDto.username);
    const existingEmail = await this.usersService.findOneByEmail(createUserDto.email);

    if (existingEmail || existingUser) {
      throw new UnauthorizedException('User already exists.');
    }
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }
}