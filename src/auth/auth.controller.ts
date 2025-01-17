import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Google 소셜 로그인
  @Get('google')
  @UseGuards(AuthGuard('google')) // GoogleStrategy 사용
  async googleLogin() {
    // Google OAuth 로그인 진입점
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // GoogleStrategy 사용
  async googleLoginCallback(@Request() req) {
    return this.authService.socialLogin('google', req.user);
  }

  // Kakao 소셜 로그인
  @Get('kakao')
  @UseGuards(AuthGuard('kakao')) // KakaoStrategy 사용
  async kakaoLogin() {
    // Kakao OAuth 로그인 진입점
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao')) // KakaoStrategy 사용
  async kakaoLoginCallback(@Request() req) {
    return this.authService.socialLogin('kakao', req.user);
  }

  // Naver 소셜 로그인
  @Get('naver')
  @UseGuards(AuthGuard('naver')) // NaverStrategy 사용
  async naverLogin() {
    // Naver OAuth 로그인 진입점
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver')) // NaverStrategy 사용
  async naverLoginCallback(@Request() req) {
    return this.authService.socialLogin('naver', req.user);
  }

  // 토큰 갱신 (리프레시 토큰 사용, 선택적 기능)
  // @Post('refresh-token')
  // async refreshToken(@Request() req) {
  //   const userId = req.user.userId; // JWT에서 추출된 사용자 ID
  //   return this.authService.refreshToken(userId);
  // }
}
