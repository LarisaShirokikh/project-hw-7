import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto) {
    try {
      return await this.authService.registerUser(createUserDto.login, createUserDto.email, createUserDto.password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getUsers(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('sortDirection') sortDirection: number,
    @Query('searchLoginTerm') searchLoginTerm: string,
    @Query('searchEmailTerm') searchEmailTerm: string,
  ) {
    return this.usersService.getUsers(
      pageNumber,
      pageSize,
      sortDirection,
      searchLoginTerm,
      searchEmailTerm,
    );
  }

  /*@Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }*/
}
