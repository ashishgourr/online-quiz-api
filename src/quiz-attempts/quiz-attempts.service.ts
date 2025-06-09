import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { CreateQuizAttemptDto } from './dto/create-quiz-attempt.dto';
import { UpdateQuizAttemptDto } from './dto/update-quiz-attempt.dto';

@Injectable()
export class QuizAttemptsService {
  constructor(
    @InjectRepository(QuizAttempt)
    private quizAttemptsRepository: Repository<QuizAttempt>,
  ) {}

  async create(
    createQuizAttemptDto: CreateQuizAttemptDto,
  ): Promise<QuizAttempt> {
    const quizAttempt = this.quizAttemptsRepository.create({
      ...createQuizAttemptDto,
      startedAt: new Date(),
    });
    return this.quizAttemptsRepository.save(quizAttempt);
  }

  async findAll(userId: string): Promise<QuizAttempt[]> {
    return this.quizAttemptsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'quiz', 'questionAttempts'],
    });
  }

  async findOne(id: string, userId: string): Promise<QuizAttempt> {
    const quizAttempt = await this.quizAttemptsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user', 'quiz', 'questionAttempts'],
    });

    if (!quizAttempt) {
      throw new NotFoundException(`Quiz attempt with ID ${id} not found`);
    }

    return quizAttempt;
  }

  async update(
    id: string,
    updateQuizAttemptDto: UpdateQuizAttemptDto,
    userId: string,
  ): Promise<QuizAttempt> {
    const quizAttempt = await this.findOne(id, userId);
    Object.assign(quizAttempt, updateQuizAttemptDto);
    return this.quizAttemptsRepository.save(quizAttempt);
  }

  async remove(id: string, userId: string): Promise<void> {
    const quizAttempt = await this.findOne(id, userId);
    await this.quizAttemptsRepository.remove(quizAttempt);
  }
}
