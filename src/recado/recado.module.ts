import { Module } from '@nestjs/common';
import { RecadoService } from './recado.service';
import { RecadoController } from './recado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoaModule } from 'src/pessoa/pessoa.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), PessoaModule],
  controllers: [RecadoController],
  providers: [RecadoService],
})
export class RecadoModule {}
