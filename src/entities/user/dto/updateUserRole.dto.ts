import { E_Roles } from '../types';

import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserRoleDto {
  @IsEnum(E_Roles)
  @IsOptional()
  role: E_Roles;
}
