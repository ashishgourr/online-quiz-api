import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { QuizAttemptsService } from './quiz-attempts.service';
import { CreateQuizAttemptDto } from './dto/create-quiz-attempt.dto';
import { UpdateQuizAttemptDto } from './dto/update-quiz-attempt.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}

@Controller('quiz-attempts')
@UseGuards(JwtAuthGuard)
export class QuizAttemptsController {
  constructor(private readonly quizAttemptsService: QuizAttemptsService) {}

  @Post()
  create(
    @Body() createQuizAttemptDto: CreateQuizAttemptDto,
    @Request() req: RequestWithUser,
  ) {
    return this.quizAttemptsService.create({
      ...createQuizAttemptDto,
      userId: req.user.id,
    });
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.quizAttemptsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.quizAttemptsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizAttemptDto: UpdateQuizAttemptDto,
    @Request() req: RequestWithUser,
  ) {
    return this.quizAttemptsService.update(
      id,
      updateQuizAttemptDto,
      req.user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.quizAttemptsService.remove(id, req.user.id);
  }
}
