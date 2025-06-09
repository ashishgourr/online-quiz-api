import { IsUUID, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreateQuizAttemptDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  quizId: string;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsNumber()
  @IsOptional()
  totalQuestions?: number;

  @IsNumber()
  @IsOptional()
  correctAnswers?: number;

  @IsDate()
  @IsOptional()
  startedAt?: Date;

  @IsDate()
  @IsOptional()
  completedAt?: Date;
}
