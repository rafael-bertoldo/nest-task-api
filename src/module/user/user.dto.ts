export type UserDTO = {
  id?: string;
  username: string;
  password: string;
  email: string;
  tasks?: {
    id?: string;
    title: string;
    description?: string;
    due_date: Date;
    priority: number;
    completed: boolean;
    created_at: Date;
    user_id: string;
  }[];
};
