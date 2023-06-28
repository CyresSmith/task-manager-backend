import { Category } from '@entities/categories/category.entity';
import { User } from '@entities/user/user.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'desc', type: 'varchar' })
  desc: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'author' })
  author: User;

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'category' })
  category: Category;
}
