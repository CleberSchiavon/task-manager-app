import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TypeOrmModule]
})
export class TaskModule {}