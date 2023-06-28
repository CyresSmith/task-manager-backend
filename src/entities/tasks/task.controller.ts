import { Category } from '@entities/categories/category.entity';
import {
  Controller,
  Post,
  Req,
  Body,
  Res,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
  Put,
  BadRequestException,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AdminAccessGuard } from 'src/guards/adminAccess.guard';

import { TaskService } from './task.service';
import { CategoryService } from '@entities/categories/category.service';

import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService
  ) {}

  // ============================================ Create task
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createTask(
    @Req() req,
    @Body() body: CreateTaskDto,
    @Res() res: Response
  ) {
    const existCategory = await this.categoryService.getCategoryById(
      Number(body.category)
    );

    if (!existCategory)
      throw new BadRequestException(
        `Category with id "${body.category}" not found`
      );

    const newTask = await this.taskService.createTask(body, req.user.id);

    if (!newTask)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    res.status(201).send(newTask);
  }

  // ============================================ Get All tasks
  @Get('/')
  async getAllTasks(
    @Query() query: { category: Category },
    @Res() res: Response
  ) {
    if (query.category) {
      const existCategory = await this.categoryService.getCategoryById(
        Number(query.category)
      );

      if (!existCategory)
        throw new BadRequestException(
          `Category with id "${query.category}" not found`
        );
    }

    const tasks = await this.taskService.getAllTasks(query.category);

    if (!tasks)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    res.status(200).send(tasks);
  }

  // ============================================ Get task by id
  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const task = await this.taskService.getTaskById(id);

    if (!task) throw new NotFoundException('Tasks not found');

    res.status(200).send(task);
  }

  // ============================================ Update task
  @UseGuards(JwtAuthGuard, AdminAccessGuard)
  @Put('/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
    @Res()
    res: Response
  ) {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('Nothing to update');

    const existTask = await this.taskService.getTaskById(id);

    if (!existTask)
      throw new BadRequestException(`Task with id: ${id} not found`);

    const update = await this.taskService.updateTask(id, body);

    if (!update)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    res.status(200).send(update);
  }

  // ============================================ Delete task
  @UseGuards(JwtAuthGuard, AdminAccessGuard)
  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Res()
    res: Response
  ) {
    const existTask = await this.taskService.getTaskById(id);

    if (!existTask)
      throw new BadRequestException(`Task with id: ${id} not found`);

    const isDeleted = await this.taskService.deleteTask(id);

    if (!isDeleted)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    res.status(200).send('Task successfully deleted');
  }
}
