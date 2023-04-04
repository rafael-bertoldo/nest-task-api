import { ApiProperty } from "@nestjs/swagger";
import { TaskDTO } from "../task/task.dto";

export class UserDTO {
  id?: string;

  @ApiProperty({
    description: 'An username to identify an user',
    example: 'Rafael Bertoldo'
  })
  username: string;

  @ApiProperty({
    description: 'A password to use on login',
    example: "1234@Abc"
  })
  password: string;

  @ApiProperty({
    description: 'A email to use on login',
    example: 'rafaelBertoldo@mail.com'
  })
  email: string;
  
  tasks?: TaskDTO[];
};
