import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserDTO } from '../user/user.dto';
import { TaskDTO } from './task.dto';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() data: TaskDTO, @CurrentUser() user: UserDTO) {
    return this.taskService.create(data, user.id)
  }

  @Get()
  readAll(@CurrentUser() user: UserDTO) {
    return this.taskService.getAll(user.id)
  }

  @Get('due_date')
  readAllByDueDate(@CurrentUser() user: UserDTO) {
    return this.taskService.getByDueDate(user.id)
  }

  @Get('priority')
  readAllByPriority(@CurrentUser() user: UserDTO) {
    return this.taskService.getByPriority(user.id)
  }

  @Patch(':id')
  async updateTaskById(@CurrentUser() user: UserDTO, @Body() data: TaskDTO, @Param('id') id: string) {
    await this.taskService.updateTask(id, data, user.id)

    return {
      message: 'Task updated'
    }
  }

  @Delete(':id')
  async deleteTaskById(@CurrentUser() user: UserDTO, @Param('id') id: string) {
    await this.taskService.deleteById(id, user.id)

    return {
      message: 'Task deleted'
    }
  }
}