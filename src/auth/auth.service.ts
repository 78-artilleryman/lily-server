import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 소셜 로그인
  async socialLogin(provider: string, profile: any) {
    console.log(profile);
    const { id, email, name, picture } = profile;

    if (!id) {
      throw new Error('소셜 로그인 프로필에 ID가 없습니다.');
    }

    // 기존 사용자 검색
    let user = await this.userService.findBySocialId(provider, id);

    // 사용자가 없으면 생성
    if (!user) {
      user = await this.userService.create({
        email,
        name,
        profileImage: picture,
        provider,
        providerId: id,
      });
    }

    return {
      message: '소셜 로그인 성공',
      user,
    };
  }
}
