import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BaseUser } from '../users/dto/base-user-dto.dto';

describe('AuthController', () => {
  let app: INestApplication;
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const mockLoginDto = { email: 'test@example.com', password: 'password' };
      const mockToken = { access_token: 'mock_token' };

      jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(mockLoginDto)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(mockToken);
      expect(authService.login).toHaveBeenCalledWith(mockLoginDto.email, mockLoginDto.password);
    });
  });

  describe('signup', () => {
    it('should return a new user on successful signup', async () => {
      const signupDto: BaseUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedUser = {
        id: 1,
        ...signupDto,
        createdAt: expect.any(Object),
        updatedAt: expect.any(Object),
      };

      jest.spyOn(authService, 'signUp').mockResolvedValue(expectedUser);

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupDto)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(expectedUser);
      expect(authService.signUp).toHaveBeenCalledWith({
        username: signupDto.username,
        email: signupDto.email,
        password: signupDto.password,
        createdAt: expect.any(Date),
      });
      expect(authService.signUp).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if signup fails', async () => {
      const signupDto: BaseUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(authService, 'signUp').mockRejectedValue(new Error('Signup failed'));

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.body.message).toEqual('Internal server error');
      expect(authService.signUp).toHaveBeenCalledWith({
        username: signupDto.username,
        email: signupDto.email,
        password: signupDto.password,
        createdAt: expect.any(Date),
      });
      expect(authService.signUp).toHaveBeenCalledTimes(1);
    });
  });
});