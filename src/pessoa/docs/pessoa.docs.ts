import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateResponse } from './createResponse';

export class PessoaDocs extends CreateResponse {
  static findAll() {
    return applyDecorators(ApiOperation({ summary: 'Obter todas as Pessoa' }));
  }
  static findOne() {
    return applyDecorators(
      ApiOperation({ summary: 'Obter a Pessoa por id' }),
      ApiParam({ name: 'id', description: 'id de pessoa', example: 1 }),
      ApiBearerAuth(),
      this.createResponse.unauthorized,
      this.createResponse.notFound,
    );
  }
  static create() {
    return applyDecorators(
      ApiOperation({ summary: 'Criar uma Pessoa' }),
      this.createResponse.notFound,
      this.createResponse.unauthorized,
      this.createResponse.conflict,
    );
  }
  static update() {
    return applyDecorators(
      ApiOperation({ summary: 'Atualizar a Pessoa' }),
      ApiBearerAuth(),
      this.createResponse.notFound,
      this.createResponse.unauthorized,
      this.createResponse.badRequest,
    );
  }
  static remove() {
    return applyDecorators(
      ApiOperation({ summary: 'Deletar a Pessoa por id' }),
      ApiBearerAuth(),
      this.createResponse.notFound,
      this.createResponse.unauthorized,
      this.createResponse.badRequest,
    );
  }
}
