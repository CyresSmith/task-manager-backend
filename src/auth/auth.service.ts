import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserService } from '@entities/user/user.service';
import { CreateUserDto } from '@entities/user/dto/createUser.dto';
import { LoginUserDto } from '@entities/user/dto/loginUser.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  // ============================================ Register user
  async registerUser(userData: CreateUserDto) {
    const existUser = await this.userService.findUserByEmail(userData.email);

    if (existUser) throw new BadRequestException('Email already in use');

    await this.userService.createUser(userData);
  }

  // ============================================ Login user
  async loginUser(userData: LoginUserDto) {
    const existUser = await this.userService.findUserByEmail(userData.email);

    if (!existUser) throw new BadRequestException('User not found');

    const validPassword = await compare(userData.password, existUser.password);

    if (!validPassword)
      throw new UnauthorizedException('Email or password is wrong');

    const { password, ...user } = existUser;

    const token = await this.tokenService.generateJwtToken(user);

    return { user, token };
  }
}
