import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export class CreateResponse {
  protected static readonly createResponse = {
    notFound: ApiResponse({
      status: 404,
      example: new NotFoundException('Recado não Encontrado').getResponse(),
    }),
    unauthroized: ApiResponse({
      status: 401,
      example: new UnauthorizedException(
        'Você precisa esta logado',
      ).getResponse(),
    }),
    badRequest: ApiResponse({
      status: 400,
      example: new BadRequestException('Error Message').getResponse(),
    }),
  };
}
