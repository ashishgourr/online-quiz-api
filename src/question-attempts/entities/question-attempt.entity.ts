import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { QuizAttempt } from '../../quiz-attempts/entities/quiz-attempt.entity';
import { Answer } from '../../answers/entities/answer.entity';

@Entity('question_attempts')
export class QuestionAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question)
  question: Question;

  @ManyToOne(() => QuizAttempt, (quizAttempt) => quizAttempt.questionAttempts)
  quizAttempt: QuizAttempt;

  @ManyToOne(() => Answer)
  selectedAnswer: Answer;

  @Column({ type: 'boolean', nullable: true })
  isCorrect: boolean;

  @Column({ type: 'float', nullable: true })
  score: number;

  @Column({ type: 'timestamp', nullable: true })
  answeredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
