import { Controller, Post, Body, Get, Param, Query, Delete, Patch, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

import { Serialize } from '../interceptors/serlialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService, 
    private authService: AuthService){}
  
  @Post('/signup')
  createUser(@Body() body: CreateUserDto){
   return this.authService.signUp(body.email,body.password);
  }

  @Post('sign-in')
  signIn(@Body() body: CreateUserDto){
   return this.authService.signIn(body.email,body.password);
  }
  
  @Get('/:id')
  async findUserById(@Param('id') id: string){
    const userId = parseInt(id);
    const user = await this.userService.findOne(userId);;
    if(!user){
      return new NotFoundException('User with specified id not found');
    }
    return user;
  }

  @Get()
  findUserByEmail(@Query('email') email: string){
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUserById(@Param('id') id: string){
    const userId = parseInt(id);
    this.userService.remove(userId);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    const userId = parseInt(id);
    return this.userService.update(userId,body);
  }
}
