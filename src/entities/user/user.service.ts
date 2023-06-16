import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserRoleDto } from './dto/updateUserRole.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  // ============================================ Find user by email
  public async findUserByEmail(email: string) {
    const existUser = await this.userRepository.findOne({
      where: { email },
    });

    return existUser;
  }

  // ============================================ Register new user
  public async createUser(userData: CreateUserDto) {
    const password = await hash(userData.password, 10);

    const newUser = this.userRepository.create({
      ...userData,
      password,
    });

    return await this.userRepository.save(newUser);
  }

  // ============================================ Get user data by id
  public async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'role'],
    });
  }

  // ============================================ Get all users
  public async getAllUsers() {
    return await this.userRepository.find({ select: ['id', 'email', 'role'] });
  }

  // ============================================ Update user data
  public async updateUserData(id: number, userData: UpdateUserDto) {
    const update = await this.userRepository
      .createQueryBuilder()
      .update()
      .set(userData)
      .where({ id })
      .returning(['id', 'email', 'role'])
      .execute();

    return update.raw[0];
  }

  // ============================================ Update user role
  public async updateUserRole(id: number, userData: UpdateUserRoleDto) {
    const update = await this.userRepository
      .createQueryBuilder()
      .update()
      .set(userData)
      .where({ id })
      .returning(['id', 'email', 'role'])
      .execute();

    return update.raw[0];
  }

  // ============================================ Delete user
  public async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
