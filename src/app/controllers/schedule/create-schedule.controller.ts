import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateScheduleDTO,
  CreateScheduleUseCase,
} from '@application/in/create-schedule.use-case';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { AdminGuard } from 'src/app/guards/admin.guard';

class CreateScheduleBody implements CreateScheduleDTO {
  @IsDateString()
  workDate: Date;
  @IsNotEmpty()
  userId: string;
  @IsNumber()
  @IsPositive()
  shiftHours: number;
}

@Controller('schedules')
export class CreateScheduleController {
  constructor(private readonly createScheduleUseCase: CreateScheduleUseCase) {}

  @Post()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() createScheduleDTO: CreateScheduleBody): Promise<void> {
    return this.createScheduleUseCase.execute(createScheduleDTO);
  }
}
