import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseUser } from '../users/dto/base-user-dto.dto';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { Public } from './strategy';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login Route' })
  @ApiResponse({
    status: 200,
    type: [BaseUser],
  })
  login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Signup Route' })
  @ApiResponse({
    status: 200,
    type: [BaseUser],
  })
  signup(@Body() signupDto: CreateUserDto) {
    const payload = {
      username: signupDto.username,
      email: signupDto.email,
      password: signupDto.password,
      createdAt: new Date(),
    };
    return this.authService.signUp(payload);
  }
}
