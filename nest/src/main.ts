import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CasbinGuard } from './casbin/casbin.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap();
