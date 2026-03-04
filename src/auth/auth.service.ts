import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import authConfig from './auth.config';
import { ConfigType } from '@nestjs/config';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly bcryptService: HashingService,
    private readonly jwtService: JwtService,
  ) {}
  async auth(authDto: AuthDto): Promise<ResponseDto> {
    const { email, password } = authDto;

    const pessoa = await this.pessoaRepository.findOneBy({ email });

    if (!pessoa) throw new NotFoundException('pessoa not exist');

    const isValid = await this.bcryptService.compare(
      password,
      pessoa.passwordHash,
    );

    if (!isValid) throw new BadRequestException('password invalid');
    const token = this.jwtService.sign(
      {
        sub: pessoa.id,
        name: pessoa.name,
      },
      {
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
        expiresIn: this.authConfiguration.expiresIn,
        secret: this.authConfiguration.secret,
      },
    );

    return {
      token,
    };
  }
}
