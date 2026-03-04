import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_PAYLOAD_TOKEN } from '../constant/token.constant';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;
    const token = this.extractToken(req);
    if (!token) throw new UnauthorizedException('you not authorization');

    try {
      const payload = this.jwtService.decode(token);
      if (!payload) throw new Error('token invalid');
      req[REQUEST_PAYLOAD_TOKEN] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractToken(req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    return token;
  }
}
