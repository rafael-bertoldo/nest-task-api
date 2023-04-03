import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TaskDTO } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: TaskDTO, id: string) {
    const {title, description, due_date, priority, } = data

    const checkUser = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return await this.prisma.task.create({
      data: {
        title,
        description,
        due_date,
        priority,
        user_id: id
      }
    })
  }
}