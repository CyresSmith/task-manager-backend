import { Category } from '@entities/categories/category.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
  categoryId: Category;
}
