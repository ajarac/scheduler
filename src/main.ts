import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApiModule } from '@api/api.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(ApiModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().setTitle('Scheduler').setDescription('Scheduler API to track your team').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}

bootstrap();
