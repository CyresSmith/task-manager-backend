import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@entities/user/user.entity';

import { Task } from './task.entity';

import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  // ============================================ Create task
  public async createTask(taskData: CreateTaskDto, author: User) {
    const newTask = this.taskRepository.create({
      ...taskData,
      author,
    });

    return await this.taskRepository.save(newTask);
  }

  // ============================================ Get all tasks
  public async getAllTasks(category?) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where(category ? { category } : {})
      .leftJoinAndSelect('task.author', 'User')
      .leftJoinAndSelect('task.category', 'Category')
      .select([
        'task',
        'Category.id',
        'Category.name',
        'Category.dateCreated',
        'Category.author',
        'User.id',
        'User.email',
        'User.role',
      ])
      .getMany();
  }

  // ============================================ Get task by id
  public async getTaskById(id: number) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where({ id })
      .leftJoinAndSelect('task.author', 'User')
      .leftJoinAndSelect('task.category', 'Category')
      .select([
        'task',
        'Category.id',
        'Category.name',
        'Category.dateCreated',
        'Category.author',
        'User.id',
        'User.email',
        'User.role',
      ])
      .getOne();
  }

  // ============================================ Count tasks by category
  public async countTasksByCategory(category: string) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where({ category })
      .getCount();
  }

  // ============================================ Update task
  public async updateTask(id: number, data: UpdateTaskDto) {
    const update = await this.taskRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where({ id })
      .returning('*')
      .execute();

    return update.raw[0];
  }

  // ============================================ Delete task
  public async deleteTask(id: number) {
    return await this.taskRepository.delete(id);
  }
}
