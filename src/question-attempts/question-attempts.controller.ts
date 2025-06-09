import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionAttemptsService } from './question-attempts.service';
import { CreateQuestionAttemptDto } from './dto/create-question-attempt.dto';
import { UpdateQuestionAttemptDto } from './dto/update-question-attempt.dto';

@Controller('question-attempts')
export class QuestionAttemptsController {
  constructor(
    private readonly questionAttemptsService: QuestionAttemptsService,
  ) {}

  @Post()
  create(@Body() createQuestionAttemptDto: CreateQuestionAttemptDto) {
    return this.questionAttemptsService.create(createQuestionAttemptDto);
  }

  @Get()
  findAll() {
    return this.questionAttemptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionAttemptsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionAttemptDto: UpdateQuestionAttemptDto,
  ) {
    return this.questionAttemptsService.update(id, updateQuestionAttemptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionAttemptsService.remove(id);
  }
}
