import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from Google';
    }
    const { email, name } = req.user;

    // 사용자 정보 저장 (이미 존재하면 업데이트 또는 무시)
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return this.prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    return existingUser; // 이미 등록된 사용자 반환
  }
}
