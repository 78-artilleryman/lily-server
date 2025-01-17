import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // 사용자 생성
  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  // 소셜 ID로 사용자 검색
  async findBySocialId(provider: string, providerId: string) {
    return this.prisma.user.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
    });
  }

  // 사용자 이메일로 검색 (추가적인 필요 로직)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
