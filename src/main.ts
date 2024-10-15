import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 3020;
  await app.listen(port, host, () => {
    console.log(`Server start on http://${host}:${port}`);
  });
}
bootstrap();
