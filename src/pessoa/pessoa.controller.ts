import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaDto } from './dto/pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { ReqTokenPayload } from 'src/auth/param/req-token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { ApiTags } from '@nestjs/swagger';
import { PessoaDocs } from './docs/pessoa.docs';

@ApiTags('Pessoa')
@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  @PessoaDocs.findAll()
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  @PessoaDocs.findOne()
  @UseGuards(AuthTokenGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoaService.findOne(id);
  }

  @Post()
  @PessoaDocs.create()
  create(@Body() pessoaDto: PessoaDto) {
    return this.pessoaService.create(pessoaDto);
  }

  @Patch()
  @PessoaDocs.update()
  @UseGuards(AuthTokenGuard)
  update(
    @Body() updatePessoaDto: UpdatePessoaDto,
    @ReqTokenPayload() payload: PayloadDto,
  ) {
    return this.pessoaService.update(updatePessoaDto, payload);
  }

  @Delete()
  @PessoaDocs.remove()
  @UseGuards(AuthTokenGuard)
  remove(@ReqTokenPayload() payload: PayloadDto) {
    return this.pessoaService.remove(payload);
  }
}
