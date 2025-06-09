import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@ApiTags('answers')
@Controller('answers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new answer' })
  @ApiResponse({
    status: 201,
    description: 'The answer has been successfully created.',
    type: Answer,
  })
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all answers' })
  @ApiResponse({
    status: 200,
    description: 'Return all answers.',
    type: [Answer],
  })
  findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an answer by id' })
  @ApiResponse({ status: 200, description: 'Return the answer.', type: Answer })
  findOne(@Param('id') id: string): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: 'Get all answers for a question' })
  @ApiResponse({
    status: 200,
    description: 'Return all answers for the question.',
    type: [Answer],
  })
  findByQuestion(@Param('questionId') questionId: string): Promise<Answer[]> {
    return this.answersService.findByQuestion(questionId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update an answer' })
  @ApiResponse({
    status: 200,
    description: 'The answer has been successfully updated.',
    type: Answer,
  })
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<Answer> {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an answer' })
  @ApiResponse({
    status: 200,
    description: 'The answer has been successfully deleted.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.answersService.remove(id);
  }
}
