import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      username: POSTGRES_USERNAME,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
      entities: ['dist/entities/**/*.entity.js'],
      //   migrations: ['dist/db/migrations/**/*.js'],
      synchronize: true,
      // cli: {migrationsDir: 'src/db/migrations'}
    }),
  ],
})
export class TypeOrmModule {}
