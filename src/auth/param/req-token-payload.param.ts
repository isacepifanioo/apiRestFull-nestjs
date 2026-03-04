import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PayloadDto } from '../dto/payload.dto';
import { REQUEST_PAYLOAD_TOKEN } from '../constant/token.constant';

export const ReqTokenPayload = createParamDecorator(
  (data: PayloadDto, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as Request;
    const payload = req[REQUEST_PAYLOAD_TOKEN];
    return payload;
  },
);
