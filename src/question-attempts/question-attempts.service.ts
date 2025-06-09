import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionAttempt } from './entities/question-attempt.entity';
import { CreateQuestionAttemptDto } from './dto/create-question-attempt.dto';
import { UpdateQuestionAttemptDto } from './dto/update-question-attempt.dto';

@Injectable()
export class QuestionAttemptsService {
  constructor(
    @InjectRepository(QuestionAttempt)
    private questionAttemptsRepository: Repository<QuestionAttempt>,
  ) {}

  async create(
    createQuestionAttemptDto: CreateQuestionAttemptDto,
  ): Promise<QuestionAttempt> {
    const questionAttempt = this.questionAttemptsRepository.create(
      createQuestionAttemptDto,
    );
    return this.questionAttemptsRepository.save(questionAttempt);
  }

  async findAll(): Promise<QuestionAttempt[]> {
    return this.questionAttemptsRepository.find({
      relations: ['question', 'quizAttempt', 'selectedAnswer'],
    });
  }

  async findOne(id: string): Promise<QuestionAttempt> {
    const questionAttempt = await this.questionAttemptsRepository.findOne({
      where: { id },
      relations: ['question', 'quizAttempt', 'selectedAnswer'],
    });

    if (!questionAttempt) {
      throw new NotFoundException(`Question attempt with ID ${id} not found`);
    }

    return questionAttempt;
  }

  async update(
    id: string,
    updateQuestionAttemptDto: UpdateQuestionAttemptDto,
  ): Promise<QuestionAttempt> {
    const questionAttempt = await this.findOne(id);
    Object.assign(questionAttempt, updateQuestionAttemptDto);
    return this.questionAttemptsRepository.save(questionAttempt);
  }

  async remove(id: string): Promise<void> {
    const questionAttempt = await this.findOne(id);
    await this.questionAttemptsRepository.remove(questionAttempt);
  }
}
