import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Task } from '@entities/tasks/task.entity';
import { TaskService } from '@entities/tasks/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Task])],
  controllers: [CategoryController],
  providers: [CategoryService, TaskService],
  exports: [CategoryService],
})
export class CategoryModule {}
