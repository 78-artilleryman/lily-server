import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 소셜 로그인
  async socialLogin(provider: string, profile: any) {
    const { id, email, name, picture } = profile;

    // 기존 사용자 검색
    let user = await this.userService.findBySocialId(provider, id);

    // 사용자가 없으면 생성 (회원가입)
    if (!user) {
      user = await this.userService.create({
        email,
        name,
        profileImage: picture,
        provider,
        providerId: id,
      });
    }

    // 유저 정보를 반환하거나, 토큰 발급 로직을 추가
    return {
      message: '소셜 로그인 성공',
      user,
    };
  }
}
