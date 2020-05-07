import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CatsModule } from './cats/cats.module';
import { OwnerModule } from './owners/owner.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Cats API')
    .setDescription('Cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const catsDocument = SwaggerModule.createDocument(app, options, {
    include: [CatsModule],
  });
  SwaggerModule.setup('api/test2/cats', app, catsDocument);

  const secondOptions = new DocumentBuilder()
    .setTitle('Owners API')
    .setDescription('Owners API description')
    .setVersion('1.0')
    .addTag('owners')
    .build();
  const ownersDocument = SwaggerModule.createDocument(app, secondOptions, {
    include: [OwnerModule],
  });
  SwaggerModule.setup('api/test2/owners', app, ownersDocument);
  await app.listen(3000);
}
bootstrap();
