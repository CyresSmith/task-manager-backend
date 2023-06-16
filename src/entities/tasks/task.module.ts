import { CategoryModule } from '@entities/categories/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CategoryModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
