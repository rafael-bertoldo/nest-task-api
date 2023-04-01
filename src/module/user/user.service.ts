import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO) {
    const checkEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPass,
      },
    });

    const { password, ...rest } = newUser;

    return rest;
  }
}
