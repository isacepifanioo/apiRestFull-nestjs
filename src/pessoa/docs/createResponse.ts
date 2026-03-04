import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export class CreateResponse {
  protected static readonly createResponse = {
    notFound: ApiResponse({
      status: 404,
      example: new NotFoundException('Pessoa não Encontrado').getResponse(),
    }),
    unauthorized: ApiResponse({
      status: 401,
      example: new UnauthorizedException(
        'Você precisa esta logado',
      ).getResponse(),
    }),
    badRequest: ApiResponse({
      status: 400,
      example: new BadRequestException('Error Message').getResponse(),
    }),
    conflict: ApiResponse({
      status: 409,
      example: new ConflictException('email ja existente').getResponse(),
    }),
  };
}
