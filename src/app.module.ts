import { Module } from '@nestjs/common';
import { RecadoModule } from './recado/recado.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from './app.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (appConfiguration: ConfigType<typeof appConfig>) => {
        return {
          type: appConfiguration.database.type,
          username: appConfiguration.database.username,
          database: appConfiguration.database.database,
          host: appConfiguration.database.host,
          password: appConfiguration.database.password,
          port: appConfiguration.database.port,
          autoLoadEntities: appConfiguration.database.autoLoadEntities,
          synchronize: appConfiguration.database.synchronize,
          ssl: {
            rejectUnauthorized: false,
          },
          url: appConfiguration.database.url,
        };
      },
    }),
    RecadoModule,
    PessoaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
