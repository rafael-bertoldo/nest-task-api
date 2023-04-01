import {
  Controller,
  Post,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthDTO } from './auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { isPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
