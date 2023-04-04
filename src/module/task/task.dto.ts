export class TaskDTO {
  id?: string;
  title: string;
  description?: string;
  due_date: Date;
  priority: number;
  completed: boolean;
  created_at: Date;
  user_id: string;
}