import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService]
})

export class TaskModule {}