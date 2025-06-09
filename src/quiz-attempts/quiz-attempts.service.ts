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
    const quizAttempt =
      this.quizAttemptsRepository.create(createQuizAttemptDto);
    return this.quizAttemptsRepository.save(quizAttempt);
  }

  async findAll(): Promise<QuizAttempt[]> {
    return this.quizAttemptsRepository.find({
      relations: ['user', 'quiz', 'questionAttempts'],
    });
  }

  async findOne(id: string): Promise<QuizAttempt> {
    const quizAttempt = await this.quizAttemptsRepository.findOne({
      where: { id },
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
  ): Promise<QuizAttempt> {
    const quizAttempt = await this.findOne(id);
    Object.assign(quizAttempt, updateQuizAttemptDto);
    return this.quizAttemptsRepository.save(quizAttempt);
  }

  async remove(id: string): Promise<void> {
    const quizAttempt = await this.findOne(id);
    await this.quizAttemptsRepository.remove(quizAttempt);
  }
}
