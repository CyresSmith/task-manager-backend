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

    const { password, token, ...user } = await this.userService.createUser(
      userData
    );

    const newToken = await this.tokenService.generateJwtToken(user);

    await this.userService.updateUserToken(user.id, newToken);

    return { user, token: newToken };
  }

  // ============================================ Login user
  async loginUser(userData: LoginUserDto) {
    const existUser = await this.userService.findUserByEmail(userData.email);

    if (!existUser) throw new BadRequestException('User not found');

    const validPassword = await compare(userData.password, existUser.password);

    if (!validPassword)
      throw new UnauthorizedException('Email or password is wrong');

    const { password, token, ...user } = existUser;

    const newToken = await this.tokenService.generateJwtToken(user);

    await this.userService.updateUserToken(user.id, newToken);

    return { user, token: newToken };
  }

  // ============================================ Get current user
  async getCurrentUser(userToken: string) {
    const response = await this.tokenService.verifyJwtToken(userToken);

    if (!response) {
      throw new BadRequestException('Token is invalid');
    }

    const { token, password, ...user } = await this.userService.findUserByToken(
      userToken
    );

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  // ============================================ Logout user
  async logoutUser(token: string) {
    const user = await this.userService.findUserByToken(token);

    if (!user) throw new BadRequestException('User not found');

    await this.userService.updateUserToken(user.id, null);

    return 'User successfully logout';
  }
}
