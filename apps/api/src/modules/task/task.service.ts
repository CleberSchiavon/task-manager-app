import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
  ) {}

  async create(createTaskDto: CreateTaskDto):Promise<Tasks> {
    const taskData = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(taskData);
  }

  async findAll():Promise<Tasks[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number):Promise<Tasks> {
    const userData = await this.taskRepository.findOne({id});
    if (!userData) {
      throw new HttpException('Task not found', 404)
    }
    return userData
  }

  async update(id: number, updateTaskDto: UpdateTaskDto):Promise<Tasks> {
    const existingTask = await this.findOne(id);
    const updatedTask = this.taskRepository.merge(existingTask, updateTaskDto);
    return await this.taskRepository.save(updatedTask);
  }

  async remove(id: number):Promise<Tasks> {
    const task = await this.findOne(id);
    return await this.taskRepository.remove(task);
  }
}
