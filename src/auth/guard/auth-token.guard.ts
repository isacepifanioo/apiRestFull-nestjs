import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_PAYLOAD_TOKEN } from '../constant/token.constant';
import { Repository } from 'typeorm';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from '../dto/payload.dto';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;
    const token = this.extractToken(req);
    if (!token) throw new UnauthorizedException('you not authorization');

    try {
      const payload: PayloadDto | undefined = this.jwtService.decode(token);
      const pessoa = await this.pessoaRepository.findOneBy({ id: payload.sub });
      if (!payload || !pessoa) throw new Error('token invalid');
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
