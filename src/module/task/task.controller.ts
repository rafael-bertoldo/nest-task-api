import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserDTO } from '../user/user.dto';
import { TaskDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() data: TaskDTO, @CurrentUser() user: UserDTO) {
    return this.taskService.create(data, user.id)
  }

  @Get()
  readAll(@CurrentUser() user: UserDTO) {
    return new Date()
  }
}