import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { OwnerModule } from './owners/owner.module';

@Module({
  imports: [CatsModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
