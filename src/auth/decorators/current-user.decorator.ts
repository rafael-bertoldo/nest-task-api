import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/authRequest';
import { UserDTO } from 'src/module/user/user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserDTO => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user
  }
);
