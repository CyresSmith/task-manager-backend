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
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // // ============================================ Register new user
  // @Post('/')
  // async createUser(@Body() userData: CreateUserDto, @Res() res: Response) {
  //   await this.userService.createUser(userData);

  //   res.status(201).send({ message: 'created' });
  // }

  // // ============================================ Get user data by id
  // @Get('/:id')
  // async getUser(
  //   @Req() req: Request,
  //   @Param('id', ParseIntPipe) id: number,
  //   @Res() res: Response
  // ) {
  //   const data = await this.userService.getUserById(id);

  //   res.status(200).send(data);
  // }

  // // ============================================ Get all users
  // @Get('/')
  // async getAllUsers(@Req() req: Request, @Res() res: Response) {
  //   const data = await this.userService.getAllUsers();

  //   res.status(200).send(data);
  // }

  // // ============================================ Update user data
  // @Put('/:id')
  // async updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() userData: UpdateUserDto,
  //   @Res() res: Response
  // ) {
  //   await this.userService.updateUserData(id, userData);

  //   res.status(200).send({ message: 'User successfully updated' });
  // }

  // @Delete('/:id')
  // async deleteUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Res() res: Response
  // ) {
  //   await this.userService.deleteUser(id);

  //   res.status(200).send({ message: 'User successfully deleted' });
  // }
}
