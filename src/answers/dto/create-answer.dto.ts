import { IsString, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({ description: 'The text of the answer' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'Whether this answer is correct' })
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty({ description: 'The ID of the question this answer belongs to' })
  @IsUUID()
  questionId: string;
}
