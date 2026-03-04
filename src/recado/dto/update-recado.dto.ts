import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRecadoDto {
  @IsString()
  @IsOptional()
  recado: string;
  @IsOptional()
  @IsBoolean()
  lido: boolean;
}
