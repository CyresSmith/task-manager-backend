import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { E_Roles } from '@entities/user/types';

@Injectable()
export class AdminAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();

    if (user.role !== E_Roles.Admin)
      throw new ForbiddenException('Admin rights required');

    return true;
  }
}
