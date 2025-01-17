import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID, // 네이버 클라이언트 ID
      clientSecret: process.env.NAVER_CLIENT_SECRET, // 네이버 클라이언트 시크릿
      callbackURL: process.env.NAVER_REDIRECT_URI, // 리다이렉트 URI
    });

    // 환경 변수 검증
    if (
      !process.env.NAVER_CLIENT_ID ||
      !process.env.NAVER_CLIENT_SECRET ||
      !process.env.NAVER_REDIRECT_URI
    ) {
      throw new Error('Naver OAuth 환경 변수가 설정되지 않았습니다.');
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    try {
      const { id, email, nickname, profileImage } = profile;
      const user = {
        naverId: id, // 네이버에서 제공하는 고유 사용자 ID
        email: email || null, // 이메일 (선택적 제공)
        nickname: nickname || null, // 닉네임
        profileImage: profileImage || null, // 프로필 이미지
        accessToken, // 액세스 토큰
      };
      return user; // 인증 성공 시 반환할 사용자 객체
    } catch (error) {
      throw new UnauthorizedException(`Naver 인증 실패: ${error.message}`);
    }
  }
}
