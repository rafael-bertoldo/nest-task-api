import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const config = new DocumentBuilder()
  .setTitle('Swagger Documentation - Task API With NestJs')
  .setDescription('An API that you can create a user and manage your daily tasks')
  .setVersion('1.0')
  .addTag('Auth', 'Authentication route')
  .addTag('Users', 'All users routes')
  .addTag('Tasks', 'All tasks routes')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-documentation', app, document)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
