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
    // 프로필 데이터 매핑
    const user = {
      id: profile.id || profile.sub || null, // Google 사용자 ID
      email: profile.email || profile.emails?.[0]?.value || null, // 이메일
      name: `${profile.name?.familyName || ''}${profile.name?.givenName || ''}`.trim(),
      picture: profile.picture || profile.photos?.[0]?.value || null, // 프로필 사진
    };

    // 프로필 데이터 검증
    if (!user.id || !user.email) {
      console.error('Google 프로필 데이터가 올바르지 않습니다:', user);
      throw new UnauthorizedException(
        'Google 프로필 데이터가 올바르지 않습니다.',
      );
    }

    return done(null, user); // 매핑된 사용자 데이터 반환
  }
}
