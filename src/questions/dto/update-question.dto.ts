import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    description: 'The question text',
    example: 'What is the capital of France?',
    required: false,
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'The type of question',
    enum: ['single', 'multiple', 'text'],
    example: 'single',
    required: false,
  })
  @IsOptional()
  @IsEnum(['single', 'multiple', 'text'])
  type?: 'single' | 'multiple' | 'text';

  @ApiProperty({
    description: 'Points awarded for correct answer',
    minimum: 0,
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;
}
