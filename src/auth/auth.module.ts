import { Module } from '@nestjs/common';

import { UserModule } from '@entities/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
