import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(join(__dirname, '../..'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  // npm i --save hbs
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
