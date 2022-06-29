import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApiModule } from '@api/api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().setTitle('Scheduler').setDescription('Scheduler API to track your team').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const port = parseInt(process.env.APP_PORT) || 3000;
  await app.listen(port);
}

bootstrap();
