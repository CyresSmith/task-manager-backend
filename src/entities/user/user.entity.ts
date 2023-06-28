import { Category } from '@entities/categories/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { E_Roles } from './types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: E_Roles, nullable: false })
  role: E_Roles;

  @Column({ name: 'token', type: 'varchar', nullable: true })
  token: string;

  @OneToMany(() => Category, category => category.id)
  categories: Category;
}
