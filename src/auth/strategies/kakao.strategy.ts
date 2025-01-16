import { Injectable } from '@nestjs/common';
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
    const { id, username, _json } = profile;
    const user = {
      kakaoId: id,
      name: username || _json.properties.nickname,
      email: _json.kakao_account.email,
      profileImage: _json.properties.profile_image,
      accessToken,
    };
    return user;
  }
}
