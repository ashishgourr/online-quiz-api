import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './entities/question.entity';
import { AnswersModule } from '../answers/answers.module';
import { QuizzesModule } from '../quizzes/quizzes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    forwardRef(() => AnswersModule),
    forwardRef(() => QuizzesModule),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
