import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_REDIRECT_URI || '',
      scope: ['email', 'profile'],
    });

    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REDIRECT_URI
    ) {
      throw new Error('Google OAuth 환경 변수가 설정되지 않았습니다.');
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;

      const user = {
        email: emails[0].value, // Google 계정 이메일
        firstName: name?.givenName || null, // 이름
        lastName: name?.familyName || null, // 성
        picture: photos?.[0]?.value || null, // 프로필 사진
        accessToken, // 액세스 토큰
      };

      return done(null, user); // 인증 성공 시 사용자 정보 반환
    } catch (error) {
      throw new UnauthorizedException(
        `Google 인증 실패: ${error.message || '알 수 없는 오류'}`,
      );
    }
  }
}
