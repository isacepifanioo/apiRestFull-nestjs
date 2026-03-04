export class RecadoResponseDto {
  id: number;
  recado: string;
  lido: boolean;
  deId: {
    id: number;
    name: string;
  };
  paraId: {
    id: number;
    name: string;
  };
  createAt: Date;
  updateAt: Date;
}
