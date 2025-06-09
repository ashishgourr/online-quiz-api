import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionAttempt } from './entities/question-attempt.entity';
import { CreateQuestionAttemptDto } from './dto/create-question-attempt.dto';
import { UpdateQuestionAttemptDto } from './dto/update-question-attempt.dto';
import { Answer } from '../answers/entities/answer.entity';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class QuestionAttemptsService {
  constructor(
    @InjectRepository(QuestionAttempt)
    private questionAttemptsRepository: Repository<QuestionAttempt>,
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async create(
    createQuestionAttemptDto: CreateQuestionAttemptDto,
  ): Promise<QuestionAttempt> {
    // Fetch the selected answer and question
    const answer = await this.answersRepository.findOne({
      where: { id: createQuestionAttemptDto.selectedAnswerId },
    });
    if (!answer) {
      throw new NotFoundException('Selected answer not found');
    }
    const question = await this.questionsRepository.findOne({
      where: { id: createQuestionAttemptDto.questionId },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Evaluate correctness
    const isCorrect = answer.isCorrect;
    // Assign score if correct, else 0
    const score = isCorrect ? question.points : 0;
    // Set answeredAt
    const answeredAt = new Date();

    // Create the attempt
    const questionAttempt = this.questionAttemptsRepository.create({
      ...createQuestionAttemptDto,
      selectedAnswer: answer,
      question: question,
      isCorrect,
      score,
      answeredAt,
    });
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
