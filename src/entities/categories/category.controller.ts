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
  Put,
  BadRequestException,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AdminAccessGuard } from 'src/guards/adminAccess.guard';

import { CategoryService } from './category.service';

import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // ============================================ Create category
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createCategory(
    @Req() req,
    @Body() body: CreateCategoryDto,
    @Res() res: Response
  ) {
    const newCategory = await this.categoryService.createCategory(
      body,
      req.user.id
    );

    if (!newCategory)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    res.status(201).send(newCategory);
  }

  // ============================================ Get all categories
  @Get('/')
  async getAllCategories(@Res() res: Response) {
    const categories = await this.categoryService.getAllCategories();

    if (!categories)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    if (categories.length === 0)
      throw new NotFoundException('Categories not found');

    res.status(200).send(categories);
  }

  // ============================================ Get category by ID
  @Get('/:id')
  async getCategoriesById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const category = await this.categoryService.getCategoryById(id);

    if (!category)
      throw new NotFoundException(`Category with id:${id} not found`);

    res.status(200).send(category);
  }

  // ============================================ Update category
  @UseGuards(JwtAuthGuard, AdminAccessGuard)
  @Put('/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
    @Res() res: Response
  ) {
    if (Object.keys(data).length === 0)
      throw new BadRequestException('Nothing to update');

    const existCategory = this.categoryService.getCategoryById(id);

    if (!existCategory)
      throw new BadRequestException(`Category with id: ${id} not found`);

    const updatedCategory = await this.categoryService.updateCategory(id, data);

    if (!updatedCategory)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    res.status(200).send(updatedCategory);
  }

  // ============================================ Delete category
  @UseGuards(JwtAuthGuard, AdminAccessGuard)
  @Delete('/:id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const existCategory = this.categoryService.getCategoryById(id);

    if (!existCategory)
      throw new BadRequestException(`Category with id: ${id} not found`);

    const isDeleted = await this.categoryService.deleteCategory(id);

    if (!isDeleted)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    res.status(200).send('Category successfully deleted');
  }
}
