import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAttemptsService } from './quiz-attempts.service';
import { QuizAttemptsController } from './quiz-attempts.controller';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { QuizzesModule } from '../quizzes/quizzes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizAttempt]),
    QuizzesModule,
    UsersModule,
  ],
  controllers: [QuizAttemptsController],
  providers: [QuizAttemptsService],
  exports: [QuizAttemptsService],
})
export class QuizAttemptsModule {}
