import {
  applyDecorators,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export class AuthDocs {
  static auth() {
    return applyDecorators(
      ApiOperation({ summary: 'faça login, e obtenha seu token' }),
      ApiResponse({
        status: 404,
        example: new NotFoundException().getResponse(),
      }),
      ApiResponse({
        status: 400,
        example: new BadRequestException().getResponse(),
      }),
    );
  }
}
