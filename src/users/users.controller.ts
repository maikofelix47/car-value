import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  NotFoundException,
  Session,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

import { Serialize } from '../interceptors/serlialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user-decorator';

import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('sign-in')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('current-user')
  getLoggedInUser(@Session() session: any){
      return this.userService.findOne(session.userId);
  }

  @Get('who-am-i')
  @UseGuards(AuthGuard)
  getCurretUser(@CurrentUser() user: User){
      return user;
  }

  @Post('sign-out')
  sigOut(@Session() session: any){
    session.userId = null;
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    const user = await this.userService.findOne(userId);
    if (!user) {
      return new NotFoundException('User with specified id not found');
    }
    return user;
  }

  @Get()
  findUserByEmail(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    this.userService.remove(userId);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const userId = parseInt(id);
    return this.userService.update(userId, body);
  }
}
