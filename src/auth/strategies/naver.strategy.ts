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
      console.log(profile);
      const { id, _json } = profile;
      const user = {
        id: id, // 네이버에서 제공하는 고유 사용자 ID
        email: _json.email || null, // 이메일 (선택적 제공)
        name: _json.nickname || null, // 닉네임
        picture: _json.profile_image || null, // 프로필 이미지
      };
      return user; // 인증 성공 시 반환할 사용자 객체
    } catch (error) {
      throw new UnauthorizedException(`Naver 인증 실패: ${error.message}`);
    }
  }
}
