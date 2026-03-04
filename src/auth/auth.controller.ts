import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthDocs } from './docs/auth.docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthControlle {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @AuthDocs.auth()
  auth(@Body() authDto: AuthDto) {
    return this.authService.auth(authDto);
  }
}
