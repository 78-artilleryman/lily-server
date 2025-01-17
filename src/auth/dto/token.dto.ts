export class TokenDto {
  accessToken: string; // JWT 액세스 토큰
  refreshToken?: string; // (선택) 리프레시 토큰
  expiresIn: number; // 액세스 토큰의 만료 시간(초 단위)
}
