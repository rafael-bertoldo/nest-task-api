import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { UserDTO } from 'src/module/user/user.dto';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/userToken';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: UserDTO): UserToken {
    const { email, username, id } = user;

    const payLoad: UserPayload = {
      sub: id,
      email: email,
      name: username,
    };

    const jwtToken = this.jwtService.sign(payLoad);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);

      if (checkPass) {
        const { password: userPass, ...rest } = user;

        return rest;
      }
    }

    throw new Error('Email address or password provided is incorret');
  }
}
