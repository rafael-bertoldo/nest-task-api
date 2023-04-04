import { ApiProperty } from "@nestjs/swagger";

export class TaskDTO {
  id?: string;

  @ApiProperty({
    description: 'A Title to identify your task',
    example: 'Learn nodeJs'
  })
  title: string;

  @ApiProperty({
    description: 'A Description for your task',
    example: 'Learn about nodeJs frameworks like NestJs',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'A due_date for your task, need to be in a timestamp format',
    example: '2023-05-04T11:20:28.385Z'
  })
  due_date: Date;

  @ApiProperty({
    description: 'A Priority level for your task',
    example: 2
  })
  priority: number;
  completed: boolean;
  created_at: Date;
  user_id: string;
}