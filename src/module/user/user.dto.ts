import { TaskDTO } from "../task/task.dto";

export class UserDTO {
  id?: string;
  username: string;
  password: string;
  email: string;
  tasks?: TaskDTO[];
};
