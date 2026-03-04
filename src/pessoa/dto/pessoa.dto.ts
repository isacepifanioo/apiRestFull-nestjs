import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PessoaDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  // @IsNotEmpty()
  // @IsNumber()
  // deId: number;
  // @IsNotEmpty()
  // @IsNumber()
  // paraId: number;
}
