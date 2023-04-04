import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

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

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { password, ...rest } = user

    return rest
  }

  async updateProfile(id: string, data: UserDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if(data.email) {
      const checkEmail = await this.prisma.user.findUnique({
        where: {
          email: data.email
        }
      })
  
      if(checkEmail) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
      }
    }

    if(data.password) {
      throw new HttpException('it is still not possible to change your password', HttpStatus.UNAUTHORIZED)
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        username: data.username,
        email: data.email
      }
    })

    const { password, ...rest } = updateUser

    return rest
  }

  async deleteProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return await this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
