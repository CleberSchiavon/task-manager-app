import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerReturn, LoggerTypes } from './types/Http/Logger';
import { AppLogger } from './shared/utils/AppLogger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Task Manager Api Swagger')
  .setDescription('Bem vindo a documentação dessa API no Swagger!')
  .setVersion('1.0')
  .setContact(
    'Cleber Henrique',
    'https://github.com/cleberschiavon',
    'cleberschiavon@outlook.com',
  )
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const apiPort = 3002;
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );
  
  await app
    .listen(apiPort)
    .then(() =>
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.SUCCESS,
        logMessage: `Server is running on port ${apiPort}.`,
      }),
    )
    .catch((error) =>
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.ERROR,
        logMessage: `Server error when try to run on port ${apiPort}. ${error}`,
      }),
    );
}
bootstrap();
