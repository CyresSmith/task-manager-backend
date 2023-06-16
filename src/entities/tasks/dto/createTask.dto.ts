import { Category } from '@entities/categories/category.entity';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsISO8601,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MinLength(3, {
    message: 'Name should have a minimum length of 3',
  })
  @MaxLength(20, {
    message: 'Name should have a maximum length of 20',
  })
  name: string;

  @IsISO8601()
  dateStart: Date;

  @IsISO8601()
  dateEnd: Date;

  @IsString()
  @IsNotEmpty({
    message: 'Category is required',
  })
  category: Category;
}
