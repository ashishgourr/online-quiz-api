import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { QuizAttempt } from '../../quiz-attempts/entities/quiz-attempt.entity';
import { User } from '../../users/entities/user.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: 30 })
  timeLimit: number; // in minutes

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.quizzes)
  createdBy: User;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
  attempts: QuizAttempt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'float', nullable: true })
  passingScore?: number;
}
