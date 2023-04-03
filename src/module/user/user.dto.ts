import { TaskDTO } from "../task/task.dto";

export type UserDTO = {
  id?: string;
  username: string;
  password: string;
  email: string;
  tasks?: TaskDTO[];
};
