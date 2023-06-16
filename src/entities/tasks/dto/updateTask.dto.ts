import { Category } from '@entities/categories/category.entity';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsISO8601,
  IsOptional,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Name should have a minimum length of 3',
  })
  @MaxLength(20, {
    message: 'Name should have a maximum length of 20',
  })
  name: string;

  @IsOptional()
  @IsISO8601()
  dateStart: Date;

  @IsOptional()
  @IsISO8601()
  dateEnd: Date;

  @IsOptional()
  @IsString()
  category: Category;
}
