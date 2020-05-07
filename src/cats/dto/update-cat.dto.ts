import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StateEnum } from './create-cat.dto';

export class UpdateCatDTO {
  @ApiProperty({ example: '1', description: 'The id of the Cat' })
  readonly id: number;

  @ApiProperty({ example: 'Kitty', description: 'The name of the Cat' })
  name: string;

  @ApiPropertyOptional({
    example: 'New',
    enum: ['New', 'Added', 'Updated', 'Deleted'],
  })
  
  state?: StateEnum;
}
