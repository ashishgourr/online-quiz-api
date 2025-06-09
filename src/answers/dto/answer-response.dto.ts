import { ApiProperty } from '@nestjs/swagger';

export class AnswerResponseDto {
  @ApiProperty({ description: 'The ID of the answer' })
  id: string;

  @ApiProperty({ description: 'The text of the answer' })
  text: string;

  @ApiProperty({ description: 'When the answer was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When the answer was last updated' })
  updatedAt: Date;
}
