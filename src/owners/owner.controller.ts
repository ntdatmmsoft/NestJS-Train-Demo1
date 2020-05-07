import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnedCats } from './interfaces/owner.interface';
import { CreateOwnerDTO } from './dto/create-owner.dto';
import { CreateCatDTO } from '../cats/dto/create-cat.dto';
import { UpdateOwnerDTO } from './dto/update-owner.dto';
import { UpdateCatDTO } from '../cats/dto/update-cat.dto';
import {
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { GetOwnerResponseDTO } from './dto/get';
import { PostOwnerResponseDTO } from './dto/post';
import { PatchOwnerResponseDTO } from './dto/patch';

@ApiTags('owners')
@Controller('test2/owners')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Get('/about')
  @ApiOkResponse({
    description: 'This is list records',
    type: GetOwnerResponseDTO,
    isArray: true,
  })
  getOwners(): Array<OwnedCats> {
    const owners = this.ownerService.getOwners();
    return owners;
  }

  @Get('/owner/:ownerID')
  @ApiOkResponse({
    description: 'This is record',
    type: GetOwnerResponseDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({ description: 'Not Found this Owner ID' })
  getOwnerByID(@Param('ownerID') ownerID: number): Record<string, any> {
    const owner = this.ownerService.getOwnerByID(ownerID);
    return owner;
  }
  
  @Get('/owner')
  @ApiOkResponse({
    description: 'This is record',
    type: GetOwnerResponseDTO,
    isArray: false,
  })
  @ApiNotFoundResponse({ description: 'Not Found this Owner name' })
  getOwnerByName(@Query('ownerName') ownerName: string): Record<string, any> {
    const owner = this.ownerService.getOwnerByName(ownerName);
    return owner;
  }

  @Get('/cat')
  @ApiOkResponse({
    description: 'This is record',
    type: GetOwnerResponseDTO,
    isArray: false,
  })
  @ApiResponse({ status: 403, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not Found this Owner ID' })
  @ApiResponse({ status: 404, description: 'Not Found this Cat ID' })
  getCatInOwner(
    @Query('ownerID') ownerID: number,
    @Query('catID') catID: number,
  ): Record<string, any> {
    const cat = this.ownerService.getCatInOwner(ownerID, catID);
    return cat;
  }

  @Post('/owner')
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: PostOwnerResponseDTO,
    isArray: true,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'State of Owner is not valid' })
  addOwner(@Body() ownerNew: CreateOwnerDTO): any {
    const owner = this.ownerService.addOwner(ownerNew);
    return owner;
  }

  @Post('/cat')
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: PostOwnerResponseDTO,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Not Found this Owner ID' })
  @ApiResponse({ status: 404, description: 'New Cats state not valid' })
  @ApiResponse({ status: 404, description: 'New Cats are duplicated' })
  addMultiCatsForOwner(
    @Query('ownerID') ownerID: number,
    @Body() ownerNew: CreateCatDTO[],
  ): any {
    const owner = this.ownerService.addMultiCatsForOwner(ownerID, ownerNew);
    return owner;
  }

  @Delete('/owner')
  @ApiOkResponse({ description: 'Delete OK!!!' })
  @ApiResponse({ status: 404, description: 'Not Found this Owner ID' })
  deleteOwner(@Query('ownerID') ownerID: number): string {
    const mess = this.ownerService.deleteOwner(ownerID);
    return mess;
  }

  //

  @Delete('/cat')
  @ApiOkResponse({ description: 'Deleted Cats' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found this Owner ID' })
  @ApiResponse({ status: 404, description: 'Cats are not in Owner' })
  @ApiResponse({ status: 404, description: 'Not Found Cat ID' })
  deleteMultiCatsOfOwner(
    @Query('ownerID') ownerID: number,
    @Body() ownerNew: Array<{ id: number }>,
  ): string {
    const mess = this.ownerService.deleteMultiCatsOfOwner(ownerID, ownerNew);
    return mess;
  }

  @Patch('/owner')
  @ApiOkResponse({
    description: 'Updated Owner',
    type: PatchOwnerResponseDTO,
    isArray: false,
  })
  @ApiResponse({ status: 404, description: 'Not Found this Owner ID' })
  @ApiResponse({ status: 404, description: 'State of Owner is not valid' })
  @ApiResponse({ status: 404, description: 'Cats are not valid' })
  updateOwner(@Body() ownerUpdate: UpdateOwnerDTO): any {
    const owner = this.ownerService.updateOwner(ownerUpdate);
    return owner;
  }

  @Patch('/cat')
  @ApiOkResponse({
    description: 'Updated Cat',
    type: PatchOwnerResponseDTO,
    isArray: false,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found this Owner ID' })
  @ApiResponse({ status: 404, description: 'New Array cats is not valid' })
  updateMultiCatsOfOwner(
    @Query('ownerID') ownerID: number,
    @Body() catsNew: UpdateCatDTO[],
  ): Record<string, any> {
    const cat = this.ownerService.updateMultiCatsOfOwner(ownerID, catsNew);
    return cat;
  }
}
