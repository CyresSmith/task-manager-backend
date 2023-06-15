import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@entities/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [ConfigModule, TypeOrmModule, UserModule, AuthModule, TokenModule],
})
export class AppModule {}
