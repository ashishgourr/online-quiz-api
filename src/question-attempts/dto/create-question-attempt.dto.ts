import {
  IsUUID,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateQuestionAttemptDto {
  @IsUUID()
  questionId: string;

  @IsUUID()
  quizAttemptId: string;

  @IsUUID()
  @IsOptional()
  selectedAnswerId?: string;

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsDate()
  @IsOptional()
  answeredAt?: Date;
}
