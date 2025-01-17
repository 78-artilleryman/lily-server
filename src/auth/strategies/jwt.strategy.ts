import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 토큰 추출
      ignoreExpiration: false, // 토큰 만료 검사를 활성화
      secretOrKey: process.env.JWT_SECRET, // JWT 서명 비밀키
    });

    // 환경 변수 검증
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
    }
  }

  async validate(payload: any) {
    // payload는 JWT에 저장된 사용자 정보
    return { userId: payload.sub, username: payload.username };
  }
}
