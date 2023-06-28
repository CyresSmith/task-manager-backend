import { Category } from '@entities/categories/category.entity';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsISO8601,
  IsOptional,
  IsNumber,
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

  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'Description should have a minimum length of 3',
  })
  @MaxLength(100, {
    message: 'Description should have a maximum length of 50',
  })
  desc: string;

  @IsOptional()
  @IsISO8601()
  dateStart: Date;

  @IsOptional()
  @IsISO8601()
  dateEnd: Date;

  @IsOptional()
  @IsNumber()
  category: Category;
}
