import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class CreateCategoryDto {
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
}
