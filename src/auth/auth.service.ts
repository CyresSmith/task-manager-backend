import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

// import { User } from './user.entity';

@Injectable()
export class AuthService {
  // constructor(
  //   @InjectRepository(User) private readonly userRepository: Repository<User>
  // ) {}
  // // ============================================ Register new user
  // public async createUser(userData: CreateUserDto) {
  //   const password = await hash(userData.password, 10);
  //   const newUser = this.userRepository.create({
  //     ...userData,
  //     password,
  //   });
  //   return await this.userRepository.save(newUser);
  // }
  // // ============================================ Get user data by id
  // public async getUserById(id: number) {
  //   return await this.userRepository.findOne({
  //     where: { id },
  //     select: ['id', 'email', 'role'],
  //   });
  // }
  // // ============================================ Get all users
  // public async getAllUsers() {
  //   return await this.userRepository.find({ select: ['id', 'email', 'role'] });
  // }
  // // ============================================ Update user data
  // public async updateUserData(id: number, userData: UpdateUserDto) {
  //   return await this.userRepository.update({ id }, userData);
  // }
  // // ============================================ Delete user
  // public async deleteUser(id: number) {
  //   return await this.userRepository.delete(id);
  // }
}
