import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
