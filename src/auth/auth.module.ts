import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // 추가
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { NaverStrategy } from './strategies/naver.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT 비밀 키 (환경 변수로 설정)
      signOptions: { expiresIn: '1h' }, // 기본 만료 시간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, KakaoStrategy, NaverStrategy],
})
export class AuthModule {}
