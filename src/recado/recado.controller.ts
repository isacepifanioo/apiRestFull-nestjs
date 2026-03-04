import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecadoService } from './recado.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { ReqTokenPayload } from 'src/auth/param/req-token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecadoDocs } from './docs/recado.docs';

@ApiTags('Recado')
@Controller('recado')
export class RecadoController {
  constructor(private readonly recadoService: RecadoService) {}

  @Post()
  @UseGuards(AuthTokenGuard)
  @RecadoDocs.create()
  create(
    @Body() createRecadoDto: CreateRecadoDto,
    @ReqTokenPayload() payload: PayloadDto,
  ) {
    return this.recadoService.create(createRecadoDto, payload);
  }

  @Get()
  @RecadoDocs.findAll()
  @ApiOperation({ summary: 'Obter todos os Racados' })
  findAll() {
    return this.recadoService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  @RecadoDocs.findOne()
  findOne(@Param('id') id: string) {
    return this.recadoService.findOne(+id);
  }

  @Patch(':id')
  @RecadoDocs.update()
  @UseGuards(AuthTokenGuard)
  update(
    @Param('id') id: string,
    @Body() updateRecadoDto: UpdateRecadoDto,
    @ReqTokenPayload() payload: PayloadDto,
  ) {
    return this.recadoService.update(+id, updateRecadoDto, payload);
  }

  @Delete(':id')
  @RecadoDocs.remove()
  @UseGuards(AuthTokenGuard)
  remove(@Param('id') id: string, @ReqTokenPayload() payload: PayloadDto) {
    return this.recadoService.remove(+id, payload);
  }
}
