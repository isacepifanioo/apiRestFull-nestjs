import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthControlle } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import authConfig from './auth.config';
import { ConfigModule } from '@nestjs/config';
import { AuthTokenGuard } from './guard/auth-token.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    TypeOrmModule.forFeature([Pessoa]),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  controllers: [AuthControlle],
  providers: [
    JwtService,
    AuthTokenGuard,
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthTokenGuard,
    JwtService,
  ],
})
export class AuthModule {}
