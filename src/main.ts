import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  const validationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  });
  app.useGlobalPipes(validationPipe);

  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get<number>('PORT');

  await app.listen(SERVER_PORT);

  const URL = await app.getUrl();
  console.log(`Server running on port ${URL}`);
};

bootstrap();
