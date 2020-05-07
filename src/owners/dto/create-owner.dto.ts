import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCatDTO } from '../../cats/dto/create-cat.dto';


export class CreateOwnerDTO {
  @ApiProperty({ example: '1', description: 'The id of the Owner' })
  readonly id: number;

  @ApiProperty({ example: 'Boss', description: 'The name of Owner' })
  name: string;

  @ApiPropertyOptional({
    example: 'New',
    enum: ['New', 'Added', 'Updated', 'Deleted', 'Remove Duplicated'],
  })
  
  state?: StateOwnerEnum;

  @ApiPropertyOptional({
    example: [
      { id: 1, name: 'Cat 12', state: 'New' },
      { id: 2, name: 'Cat 22', state: 'New' },
    ],
    type:[CreateCatDTO]
  })
  cats?: [CreateCatDTO];
}

export enum StateOwnerEnum {
  new = 'New',
  added = 'Added',
  updated = 'Updated',
  deleted = 'Deleted',
  duplicated = 'Remove Duplicated',
}
