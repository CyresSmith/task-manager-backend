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
  Header,
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

  // ============================================ Current user
  @UseGuards(JwtAuthGuard)
  @Get('current')
  async current(@Req() req: Request, @Res() res: Response) {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring(7);

      const response = await this.authService.getCurrentUser(token);

      res.status(200).send(response);
    }
  }

  // ============================================ Logout user
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() body: { id: number }, @Res() res: Response) {
    const response = await this.authService.logoutUser(body.id);

    res.status(200).send(response);
  }

  // ============================================ Test
  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test(@Res() res: Response) {
    res.status(200).send(true);
  }
}
