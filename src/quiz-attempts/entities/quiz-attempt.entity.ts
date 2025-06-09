import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { QuestionAttempt } from '../../question-attempts/entities/question-attempt.entity';

@Entity('quiz_attempts')
export class QuizAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.quizAttempts)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts)
  quiz: Quiz;

  @Column({ type: 'float', nullable: true })
  score: number;

  @Column({ type: 'int', nullable: true })
  totalQuestions: number;

  @Column({ type: 'int', nullable: true })
  correctAnswers: number;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @OneToMany(
    () => QuestionAttempt,
    (questionAttempt) => questionAttempt.quizAttempt,
  )
  questionAttempts: QuestionAttempt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
