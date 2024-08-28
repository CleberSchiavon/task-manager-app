import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { HttpException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Tasks>;

  const mockTaskRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Tasks),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Description' };
      const task = { id: 1, ...createTaskDto };

      mockTaskRepository.create.mockReturnValue(task);
      mockTaskRepository.save.mockResolvedValue(task);

      const result = await service.create(createTaskDto);
      expect(result).toEqual(task);
      expect(mockTaskRepository.create).toHaveBeenCalledWith(createTaskDto);
      expect(mockTaskRepository.save).toHaveBeenCalledWith(task);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ id: 1, title: 'Test Task', description: 'Test Description' }];
      mockTaskRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll();
      expect(result).toEqual(tasks);
      expect(mockTaskRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const task = { id: 1, title: 'Test Task', description: 'Test Description' };
      mockTaskRepository.findOne.mockResolvedValue(task);

      const result = await service.findOne(1);
      expect(result).toEqual(task);
      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw an exception if task not found', async () => {
      mockTaskRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(HttpException);
      await expect(service.findOne(999)).rejects.toThrow('Task not found');
    });
  });

  describe('update', () => {
    it('should update and return the task', async () => {
      const existingTask = { id: 1, title: 'Old Title', description: 'Old Description' };
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Name' };
      const updatedTask = { ...existingTask, ...updateTaskDto };

      mockTaskRepository.findOne.mockResolvedValue(existingTask);
      mockTaskRepository.merge.mockReturnValue(updatedTask);
      mockTaskRepository.save.mockResolvedValue(updatedTask);

      const result = await service.update(1, updateTaskDto);
      expect(result).toEqual(updatedTask);
      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(mockTaskRepository.merge).toHaveBeenCalledWith(existingTask, updateTaskDto);
      expect(mockTaskRepository.save).toHaveBeenCalledWith(updatedTask);
    });
  });

  describe('remove', () => {
    it('should remove and return the task', async () => {
      const task = { id: 1, title: 'Test Task', description: 'Test Description' };
      mockTaskRepository.findOne.mockResolvedValue(task);
      mockTaskRepository.remove.mockResolvedValue(task);

      const result = await service.remove(1);
      expect(result).toEqual(task);
      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(mockTaskRepository.remove).toHaveBeenCalledWith(task);
    });
  });
});