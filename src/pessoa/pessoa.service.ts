import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PessoaDto } from './dto/pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { PessoaResponseDto } from './dto/pessoa-response.dto';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly bcryptService: HashingService,
  ) {}

  async findAll(): Promise<PessoaResponseDto[]> {
    return this.pessoaRepository.find();
  }

  async findOne(id: number): Promise<PessoaResponseDto> {
    const pessoa = await this.pessoaRepository.findOneBy({ id });

    if (!pessoa) throw new NotFoundException('pessoa not exist');

    return pessoa;
  }

  async create(pessoaDto: PessoaDto): Promise<PessoaResponseDto> {
    try {
      const { name, email, password } = pessoaDto;
      const passwordHash = await this.bcryptService.hash(password);
      const pessoaEntity = {
        name,
        email,
        passwordHash,
      };

      const pessoa = this.pessoaRepository.create(pessoaEntity);

      await this.pessoaRepository.save(pessoa);

      return pessoa;
    } catch (error) {
      if (error.code == '23505')
        throw new ConflictException('pessoa already exist');
    }
  }

  async update(
    updatePessoaDto: UpdatePessoaDto,
    payload: PayloadDto,
  ): Promise<PessoaResponseDto> {
    const { name, password } = updatePessoaDto;

    const pessoaAuth = await this.pessoaRepository.findOneBy({
      id: payload.sub,
    });

    if (!pessoaAuth)
      throw new BadRequestException(
        'You are not allowed to modify this person.',
      );

    const pessoaEntity = {
      name,
      passwordHash: password
        ? await this.bcryptService.hash(password)
        : undefined,
    };

    const pessoa = await this.pessoaRepository.preload({
      ...pessoaEntity,
      id: pessoaAuth.id,
    });

    if (!pessoa) throw new NotFoundException('pessoa not exist');

    await this.pessoaRepository.save(pessoa);

    return pessoa;
  }

  async remove(payload: PayloadDto): Promise<PessoaResponseDto> {
    const pessoaAuth = await this.pessoaRepository.findOneBy({
      id: payload.sub,
    });

    if (!pessoaAuth) throw new NotFoundException('pessoa not exist');

    await this.pessoaRepository.remove(pessoaAuth);
    return pessoaAuth;
  }
}
