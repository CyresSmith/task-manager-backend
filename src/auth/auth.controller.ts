import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Body,
  Res,
  Param,
  ParseIntPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateUserDto } from '@entities/user/dto/createUser.dto';
import { LoginUserDto } from '@entities/user/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ============================================ Register user
  @Post('register')
  async register(@Body() userData: CreateUserDto, @Res() res: Response) {
    await this.authService.registerUser(userData);

    res.status(201).send({ message: 'User successfully created' });
  }

  // ============================================ Login user
  @Post('login')
  async login(@Body() userData: LoginUserDto, @Res() res: Response) {
    const response = await this.authService.loginUser(userData);

    res.status(200).send(response);
  }

  // ============================================ Test
  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test(@Res() res: Response) {
    res.status(200).send(true);
  }
}
