import {
  Controller,
  Delete,
  Get,
  Put,
  Req,
  Body,
  Res,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

import { UpdateUserDto } from './dto/updateUser.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ============================================ Get user data by id
  @Get('/:id')
  async getUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    const data = await this.userService.getUserById(id);

    res.status(200).send(data);
  }

  // ============================================ Get all users
  @Get('/')
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    const data = await this.userService.getAllUsers();

    res.status(200).send(data);
  }

  // ============================================ Update user data
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
    @Res() res: Response
  ) {
    await this.userService.updateUserData(id, userData);

    res.status(200).send({ message: 'User successfully updated' });
  }

  // ============================================ Delete user
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    await this.userService.deleteUser(id);

    res.status(200).send({ message: 'User successfully deleted' });
  }
}
