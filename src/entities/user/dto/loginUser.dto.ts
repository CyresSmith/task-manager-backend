import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(6, {
    message: 'Password should have a minimum length of 6',
  })
  @MaxLength(16, {
    message: 'Password should have a maximum length of 16',
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/, {
    message:
      'Password should have at least 1 uppercase letter, 1 lowercase letter and 1 digit!',
  })
  password: string;
}
