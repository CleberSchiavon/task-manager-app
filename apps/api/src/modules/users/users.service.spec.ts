import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  describe('findOneBy', () => {
    it('should return a user by email', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser);

      const user = await usersService.findOneByEmail('test@example.com');
      expect(user).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });

    it('should return undefined if user email is not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      const user = await usersService.findOneByEmail('nonexistent@example.com');
      expect(user).toBeUndefined();
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        email: 'nonexistent@example.com',
      });
    });

    it('should return a user by username', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser);

      const user = await usersService.findOneByUsername('testuser');
      expect(user).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        username: 'testuser',
      });
    });

    it('should return undefined if username is not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      const user = await usersService.findOneByUsername('testeteste');
      expect(user).toBeUndefined();
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        username: 'testeteste',
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'StrongPassword123!',
        createdAt: new Date(),
      };
      const mockUser = { id: 1, updatedAt: new Date(), ...createUserDto };
      jest.spyOn(usersRepository, 'save').mockResolvedValue(mockUser);

      const user = await usersService.create(createUserDto);
      expect(user).toEqual(mockUser);
      expect(usersRepository.save).toHaveBeenCalledWith({
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
      });
    });

    it('should throw an error if user creation fails', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'StrongPassword123!',
        createdAt: new Date(),
      };
      jest
        .spyOn(usersRepository, 'save')
        .mockRejectedValue(new Error('User creation failed'));

      await expect(usersService.create(createUserDto)).rejects.toThrow(
        'User creation failed',
      );
      expect(usersRepository.save).toHaveBeenCalledWith({
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
      });
    });
  });
});
