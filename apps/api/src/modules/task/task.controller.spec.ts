import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './entities/task.entity';
import { HttpException } from '@nestjs/common';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a task and return it', async () => {
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Description' };
      const task: Tasks = { id: 1, ...createTaskDto };

      mockTaskService.create.mockResolvedValue(task);

      const result = await controller.create(createTaskDto);
      expect(result).toEqual(task);
      expect(mockTaskService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks: Tasks[] = [{ id: 1, title: 'Test Task', description: 'Test Description' }];

      mockTaskService.findAll.mockResolvedValue(tasks);

      const result = await controller.findAll();
      expect(result).toEqual(tasks);
      expect(mockTaskService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const task: Tasks = { id: 1, title: 'Test Task', description: 'Test Description' };
      mockTaskService.findOne.mockResolvedValue(task);

      const result = await controller.findOne('1');
      expect(result).toEqual(task);
      expect(mockTaskService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an exception if task not found', async () => {
      mockTaskService.findOne.mockRejectedValue(new HttpException('Task not found', 404));

      await expect(controller.findOne('999')).rejects.toThrow(HttpException);
      await expect(controller.findOne('999')).rejects.toThrow('Task not found');
    });
  });

  describe('update', () => {
    it('should update and return the task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Title' };
      const existingTask: Tasks = { id: 1, title: 'Old Title', description: 'Old Description' };
      const updatedTask: Tasks = { ...existingTask, ...updateTaskDto };

      mockTaskService.update.mockResolvedValue(updatedTask);

      const result = await controller.update('1', updateTaskDto);
      expect(result).toEqual(updatedTask);
      expect(mockTaskService.update).toHaveBeenCalledWith(1, updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should remove and return the task', async () => {
      const task: Tasks = { id: 1, title: 'Test Task', description: 'Test Description' };
      mockTaskService.remove.mockResolvedValue(task);

      const result = await controller.remove('1');
      expect(result).toEqual(task);
      expect(mockTaskService.remove).toHaveBeenCalledWith(1);
    });
  });
});