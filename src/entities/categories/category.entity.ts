import { Task } from '@entities/tasks/task.entity';
import { User } from '@entities/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'author' })
  author: User;

  @OneToMany(() => Task, task => task.id)
  @JoinColumn({ name: 'tasks' })
  tasks: Task;
}
