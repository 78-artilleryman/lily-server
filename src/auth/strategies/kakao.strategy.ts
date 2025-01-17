import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID, // 카카오 REST API 키
      clientSecret: process.env.KAKAO_CLIENT_SECRET, // 선택: 카카오 클라이언트 시크릿
      callbackURL: process.env.KAKAO_REDIRECT_URI, // 리다이렉트 URI
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    try {
      const user = {
        id: profile.id + '', // 최상위 사용자 ID
        email: profile._json.kakao_account?.email || null, // 이메일 (kakao_account에 위치)
        name:
          profile._json.properties?.nickname ||
          profile.displayName ||
          'Unknown', // 닉네임
        picture: profile._json.properties?.profile_image || null, // 프로필 이미지
        accessToken, // Kakao 액세스 토큰
      };
      return user;
    } catch (error: any) {
      throw new UnauthorizedException(
        `Kakao 인증 실패: ${error.message || '알 수 없는 오류'}`,
      );
    }
  }
}
