import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from Google';
    }
    return {
      message: 'User information from Google',
      user: req.user,
    };
  }
}
