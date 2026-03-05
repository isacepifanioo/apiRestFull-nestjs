// import { PartialType } from '@nestjs/swagger';
// import { PessoaDto } from './pessoa.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePessoaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password: string;
}
