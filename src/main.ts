import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  
  app.useGlobalPipes(
    // ValidationPipe -> express 에서 검증하는 미들웨어를 설정하는 것과 비슷함
    new ValidationPipe({
      whitelist: true, // 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
      forbidNonWhitelisted: true, // 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
      transform: true, // 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
    })
  )

  app.useStaticAssets(join(__dirname, '../..'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  // npm i --save hbs
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
