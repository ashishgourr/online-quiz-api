import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuizzesService } from '../quizzes/quizzes.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @Inject(forwardRef(() => QuizzesService))
    private quizzesService: QuizzesService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const quiz = await this.quizzesService.findOne(createQuestionDto.quizId);
    if (!quiz) {
      throw new NotFoundException(
        `Quiz with ID ${createQuestionDto.quizId} not found`,
      );
    }

    const question = this.questionsRepository.create({
      ...createQuestionDto,
      quiz,
    });

    return this.questionsRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionsRepository.find({
      relations: ['quiz', 'answers'],
    });
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: ['quiz', 'answers'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.findOne(id);

    if (updateQuestionDto.type && question.answers?.length > 0) {
      throw new BadRequestException(
        'Cannot change question type when answers exist',
      );
    }

    Object.assign(question, updateQuestionDto);
    return this.questionsRepository.save(question);
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await this.questionsRepository.remove(question);
  }

  async findByQuiz(quizId: string): Promise<Question[]> {
    return this.questionsRepository.find({
      where: { quiz: { id: quizId } },
      relations: ['answers'],
    });
  }
}
