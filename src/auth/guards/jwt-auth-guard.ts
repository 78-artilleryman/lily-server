import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 기본 JWT 인증 로직 실행
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // 에러가 발생했거나 유저 정보가 없는 경우 예외 처리
    if (err || !user) {
      throw new UnauthorizedException('인증에 실패했습니다.');
    }
    return user; // 인증된 유저 반환
  }
}
