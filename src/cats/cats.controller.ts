import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cat.dto';
import { OwnerOfCat } from './interfaces/cat.interface';
import { UpdateCatDTO } from './dto/update-cat.dto';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('test2/cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/about')
  @ApiResponse({
    status: 200,
    description: 'This is list record',
    type: CreateCatDTO,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  getCats(): Array<OwnerOfCat> {
    return this.catsService.getCats();
  }

  @Get('/cat/:id')
  @ApiResponse({
    status: 200,
    description: 'This is list record',
    type: CreateCatDTO,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  getCatByID(@Param('id') id: number): Record<string, any> {
    return this.catsService.getCatByID(id);
  }

  @Get('/cat')
  @ApiOkResponse({
    description: 'This is records',
    type: CreateCatDTO,
    isArray: false,
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getCatByName(@Query('catName') catName: string): Record<string, any> {
    return this.catsService.getCatByName(catName);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Cat is created',
    type: CreateCatDTO,
    isArray: false,
  })
  @ApiResponse({ status: 403, description: 'ID is duplicated' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  addCat(@Body() catNew: CreateCatDTO): Record<string, any> {
    return this.catsService.addCat(catNew);
  }

  @Patch()
  @ApiOkResponse({
    description: 'Cat is updated',
    type: UpdateCatDTO,
    isArray: false,
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  updateCat(@Body() catUpdate: UpdateCatDTO): Record<string, any> {
    return this.catsService.updateCat(catUpdate);
  }

  @Delete()
  @ApiOkResponse({ description: 'Cat is deleted' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  deleteCat(@Query('catID') catID: number): string {
    return this.catsService.deleteCat(catID);
  }
}
