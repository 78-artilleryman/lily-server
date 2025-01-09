import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 요청 데이터를 DTO 인스턴스로 변환
      whitelist: true, // DTO에 정의되지 않은 값 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 있으면 에러 발생
    }),
  );

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
