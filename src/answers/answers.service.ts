import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { QuestionsService } from '../questions/questions.service';
import { AnswerResponseDto } from './dto/answer-response.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    @Inject(forwardRef(() => QuestionsService))
    private questionsService: QuestionsService,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const question = await this.questionsService.findOne(
      createAnswerDto.questionId,
    );
    if (!question) {
      throw new NotFoundException(
        `Question with ID ${createAnswerDto.questionId} not found`,
      );
    }

    const answer = this.answersRepository.create({
      ...createAnswerDto,
      question,
    });

    return this.answersRepository.save(answer);
  }

  async findAll(): Promise<Answer[]> {
    return this.answersRepository.find({
      relations: ['question'],
    });
  }

  async findOne(id: string): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: { id },
      relations: ['question'],
    });

    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    return answer;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.findOne(id);
    Object.assign(answer, updateAnswerDto);
    return this.answersRepository.save(answer);
  }

  async remove(id: string): Promise<void> {
    const answer = await this.findOne(id);
    await this.answersRepository.remove(answer);
  }

  async findByQuestion(questionId: string): Promise<Answer[]> {
    return this.answersRepository.find({
      where: { question: { id: questionId } },
    });
  }

  async findByQuestionForUser(
    questionId: string,
  ): Promise<AnswerResponseDto[]> {
    const answers = await this.findByQuestion(questionId);
    return answers.map((answer) => ({
      id: answer.id,
      text: answer.text,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }));
  }
}
