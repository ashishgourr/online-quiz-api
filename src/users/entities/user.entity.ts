import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { QuizAttempt } from '../../quiz-attempts/entities/quiz-attempt.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Quiz, (quiz) => quiz.createdBy)
  quizzes: Quiz[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.user)
  quizAttempts: QuizAttempt[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
