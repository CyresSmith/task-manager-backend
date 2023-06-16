import { User } from '@entities/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  // ============================================ Create category
  public async createCategory(categoryData: CreateCategoryDto, author: User) {
    const newCategory = this.categoryRepository.create({
      ...categoryData,
      author,
    });

    return await this.categoryRepository.save(newCategory);
  }

  // ============================================ Get all categories
  public async getAllCategories() {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.author', 'User')
      .select(['category', 'User.id', 'User.email', 'User.role'])
      .getMany();
  }

  // ============================================ Get category by ID
  public async getCategoryById(id: string) {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .where(id)
      .leftJoinAndSelect('category.author', 'User')
      .select(['category', 'User.id', 'User.email', 'User.role'])
      .getOne();
  }

  // ============================================ Update category
  public async updateCategory(id: number, data: UpdateCategoryDto) {
    const update = await this.categoryRepository
      .createQueryBuilder()
      .update()
      .set(data)
      .where({ id })
      .returning('*')
      .execute();

    return update.raw[0];
  }

  // ============================================ Delete category
  public async deleteCategory(id: number) {
    const isDeleted = await this.categoryRepository.delete(id);
    return isDeleted;
  }
}
