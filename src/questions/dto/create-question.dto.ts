import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, Min, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The question text',
    example: 'What is the capital of France?',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The type of question',
    enum: ['single', 'multiple', 'text'],
    example: 'single',
  })
  @IsEnum(['single', 'multiple', 'text'])
  type: 'single' | 'multiple' | 'text';

  @ApiProperty({
    description: 'Points awarded for correct answer',
    minimum: 0,
    default: 1,
  })
  @IsNumber()
  @Min(0)
  points: number;

  @ApiProperty({
    description: 'The ID of the quiz this question belongs to',
  })
  @IsUUID()
  quizId: string;
}
