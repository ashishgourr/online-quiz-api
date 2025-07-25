import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAttemptsService } from './question-attempts.service';
import { QuestionAttemptsController } from './question-attempts.controller';
import { QuestionAttempt } from './entities/question-attempt.entity';
import { QuestionsModule } from '../questions/questions.module';
import { QuizAttemptsModule } from '../quiz-attempts/quiz-attempts.module';
import { Answer } from '../answers/entities/answer.entity';
import { Question } from '../questions/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionAttempt, Answer, Question]),
    QuestionsModule,
    QuizAttemptsModule,
  ],
  controllers: [QuestionAttemptsController],
  providers: [QuestionAttemptsService],
  exports: [QuestionAttemptsService],
})
export class QuestionAttemptsModule {}
