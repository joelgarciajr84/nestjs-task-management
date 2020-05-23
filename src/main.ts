import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const looger = new Logger('bootsrap');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  looger.log(`Task Management running on port ${port}`);
}
bootstrap();
