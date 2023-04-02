import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @isPublic()
  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: UserDTO) {
    return this.userService.getProfile(user.id)
  }
}
