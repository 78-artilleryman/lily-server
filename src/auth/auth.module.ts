import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { NaverStrategy } from './strategies/naver.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PassportModule, UserModule], // UserModule과 PassportModule 임포트
  controllers: [AuthController], // AuthController 등록
  providers: [AuthService, GoogleStrategy, KakaoStrategy, NaverStrategy],
})
export class AuthModule {}
