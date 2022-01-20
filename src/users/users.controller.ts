import { Controller, Post, Body, Get, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService){}
  
  @Post('/signup')
  createUser(@Body() body: CreateUserDto){
   this.userService.create(body.email,body.password);
  }

  @Get('/:id')
  findUserById(@Param('id') id: string){
    const userId = parseInt(id);
    return this.userService.findOne(userId);
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
}
