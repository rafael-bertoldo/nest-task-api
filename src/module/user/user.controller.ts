import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { isPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @isPublic()
  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }
}
