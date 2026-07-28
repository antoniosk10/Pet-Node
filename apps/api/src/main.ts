import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = Number(config.get<string>('API_PORT') ?? 3000);
  const webOrigin = config.get<string>('WEB_ORIGIN') ?? 'http://localhost:5173';

  app.enableCors({
    origin: [webOrigin, 'http://127.0.0.1:5173'],
  });

  await app.listen(port);
}

void bootstrap();
