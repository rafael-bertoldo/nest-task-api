import { Request } from 'express';
import { UserDTO } from 'src/module/user/user.dto';

export class AuthRequest extends Request {
  user: UserDTO;
}
