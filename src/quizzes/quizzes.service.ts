import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
  ) {}

  async create(createQuizDto: CreateQuizDto, user: User): Promise<Quiz> {
    const quiz = this.quizzesRepository.create({
      ...createQuizDto,
      createdBy: user,
    });
    return this.quizzesRepository.save(quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizzesRepository.find({
      relations: ['createdBy', 'questions'],
    });
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findOne({
      where: { id },
      relations: ['createdBy', 'questions', 'questions.answers'],
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.findOne(id);
    Object.assign(quiz, updateQuizDto);
    return this.quizzesRepository.save(quiz);
  }

  async remove(id: string): Promise<void> {
    const quiz = await this.findOne(id);
    await this.quizzesRepository.remove(quiz);
  }
}
