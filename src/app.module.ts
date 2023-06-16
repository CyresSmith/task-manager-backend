import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@entities/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { CategoryModule } from '@entities/categories/category.module';
import { TaskModule } from '@entities/tasks/task.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UserModule,
    AuthModule,
    TokenModule,
    CategoryModule,
    TaskModule,
  ],
})
export class AppModule {}
