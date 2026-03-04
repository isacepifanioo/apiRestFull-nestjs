import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateResponse } from './createResponse';
import { applyDecorators } from '@nestjs/common';

export class RecadoDocs extends CreateResponse {
  static findAll() {
    return applyDecorators(ApiOperation({ summary: 'Obter todos os Racados' }));
  }
  static findOne() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary: 'Obter o Recado por id' }),
      ApiParam({ name: 'id', example: 1, description: 'Id de recado' }),
      this.createResponse.unauthroized,
      this.createResponse.notFound,
    );
  }
  static create() {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary: 'Criar um Recado' }),
      this.createResponse.notFound,
    );
  }
  static update() {
    return applyDecorators(
      ApiParam({ name: 'id', example: 1, description: 'Id do recado' }),
      ApiOperation({ summary: 'Atualizar o Recado' }),
      ApiBearerAuth(),
      this.createResponse.badRequest,
      this.createResponse.unauthroized,
      this.createResponse.notFound,
    );
  }
  static remove() {
    return applyDecorators(
      ApiParam({ name: 'id', example: 1, description: 'Id do recado' }),
      ApiOperation({ summary: 'Deletar o Recado' }),
      ApiBearerAuth(),
      this.createResponse.badRequest,
      this.createResponse.unauthroized,
      this.createResponse.notFound,
    );
  }
}
