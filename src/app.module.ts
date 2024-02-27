import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envs, validationEnv } from './config';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envs],
      validationSchema: validationEnv,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoConfig = configService.get<string>('MONGO_URI');

        return {
          uri: mongoConfig,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
