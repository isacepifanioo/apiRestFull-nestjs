import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Repository } from 'typeorm';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { RecadoResponseDto } from './dto/recado-response.dto';

@Injectable()
export class RecadoService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoaService,
  ) {}

  async create(
    createRecadoDto: CreateRecadoDto,
    payload: PayloadDto,
  ): Promise<Recado> {
    const { recado, paraId } = createRecadoDto;

    const pessoaDeId = await this.pessoaService.findOne(payload.sub);

    const pessoaParaId = await this.pessoaService.findOne(paraId);

    if (pessoaDeId.id === pessoaParaId.id)
      throw new BadRequestException(`You can't send a message to yourself.`);

    const recadoEntity = {
      recado,
      deId: pessoaDeId,
      paraId: pessoaParaId,
    };

    const Recado = this.recadoRepository.create(recadoEntity);

    await this.recadoRepository.save(Recado);

    return Recado;
  }

  findAll(): Promise<RecadoResponseDto[]> {
    return this.recadoRepository.find({
      relations: ['deId', 'paraId'],
      select: {
        deId: {
          id: true,
          name: true,
        },
        paraId: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<RecadoResponseDto> {
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: ['deId', 'paraId'],
      select: {
        deId: {
          id: true,
          name: true,
        },
        paraId: {
          id: true,
          name: true,
        },
      },
    });
    if (!recado) throw new NotFoundException('recado not exist');
    return recado;
  }

  async update(
    // bdRequest, notFoud, unauthorizarion
    id: number,
    updateRecadoDto: UpdateRecadoDto,
    payload: PayloadDto,
  ): Promise<RecadoResponseDto> {
    const { recado, lido } = updateRecadoDto;

    const recadoFind = await this.findOne(id);

    if (payload.sub !== recadoFind.deId.id)
      throw new BadRequestException('you cannot modify this recado');

    const recadoEntity = {
      recado,
      lido,
    };

    const Recado = await this.recadoRepository.preload({ id, ...recadoEntity });

    if (!Recado) throw new NotFoundException('recado not exist');

    await this.recadoRepository.save(Recado);

    return Recado;
  }

  async remove(id: number, payload: PayloadDto): Promise<RecadoResponseDto> {
    const recado = await this.findOne(id);
    if (payload.sub !== recado.deId.id)
      throw new BadRequestException('you cannot remove this recado');

    await this.recadoRepository.delete({ id });
    return recado;
  }
}
