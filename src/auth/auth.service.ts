import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from Google';
    }
    return {
      message: 'User information from Google',
      user: req.user,
    };
  }
}
