import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  recado: string;
  @IsNotEmpty()
  @IsNumber()
  paraId: number;
}
