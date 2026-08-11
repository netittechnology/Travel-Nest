import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/login.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });

  const configService = app.get(ConfigService);
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  app.use(helmet({
    contentSecurityPolicy: isProduction ? undefined: false,
    crossOriginEmbedderPolicy: false,
  }));

  app.use(cookieParser());

  app.enableCors({
    origin: isProduction
      ? configService.get<string>('origins.production')
      : configService.get<string>('origins.development'),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
      exceptionFactory: (errors) => {
        const messages = errors.flatMap(err =>
          Object.values(err.constraints ?? {})
        );

        return new BadRequestException(messages);
      },
    }),
  );

  app.useGlobalFilters(
    new AllExceptionsFilter(),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: false
    }),
    new LoggingInterceptor(),
    new TransformInterceptor(),
  )

  const PORT = configService.get<number>('PORT') || 5000;
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
