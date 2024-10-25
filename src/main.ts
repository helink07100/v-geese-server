import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const { resolve } = require('path');
const fs = require('fs');

const keyFile = fs.readFileSync(
  resolve(__dirname, '..') + '/fb.v-geese.com.key',
);
const certFile = fs.readFileSync(
  resolve(__dirname, '..') + '/fb.v-geese.com.crt',
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  // 启用 CORS
  app.enableCors({
    origin: 'https://apps.facebook.com', // Facebook 应用的来源域，或设置为 '*' 允许所有来源
    methods: 'GET,POST,DELETE,PUT',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 443);
}
bootstrap();
