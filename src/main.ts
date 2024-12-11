import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true, 
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  const port=process.env.PORT ?? 2000 
  app.use(cookieParser());
  await app.listen(port,()=>{
    console.log(port); 
     
  });
}
bootstrap();
