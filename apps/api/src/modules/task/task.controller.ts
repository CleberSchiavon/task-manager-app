import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({status: HttpStatus.CREATED, description: 'The task has been successfully created.'})
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiResponse({status: HttpStatus.OK, description: 'The tasks have been successfully retrieved.'})
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: HttpStatus.OK, description: 'The task has been successfully retrieved.'})
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({status: HttpStatus.OK, description: 'The task has been successfully updated.'})
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiResponse({status: HttpStatus.OK, description: 'The task has been successfully removed.'})
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
