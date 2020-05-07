import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCatDTO {
  @ApiProperty({ example: '1', description: 'The id of the Cat' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ example: 'Kitty', description: 'The name of the Cat' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'New',
    enum: ['New', 'Added', 'Updated', 'Deleted'],
  })
  state?: StateEnum;
}
export enum StateEnum {
  new = 'New',
  added = 'Added',
  updated = 'Updated',
  deleted = 'Deleted',
}
