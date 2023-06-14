import { E_Roles } from '../types';

import { IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsEnum(E_Roles)
  @IsOptional()
  role: E_Roles;
}
