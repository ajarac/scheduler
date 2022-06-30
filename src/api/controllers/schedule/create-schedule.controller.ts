import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateScheduleUseCase } from '@application/in/create-schedule.use-case';
import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { AdminGuard } from 'src/api/guards/admin.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

class CreateScheduleBody {
  @IsDateString()
  @ApiProperty()
  workDate: string;
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  shiftHours: number;
}

@ApiBearerAuth()
@ApiTags('schedules')
@Controller('schedules')
export class CreateScheduleController {
  constructor(private readonly createScheduleUseCase: CreateScheduleUseCase) {}

  @Post()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() { workDate, shiftHours, userId }: CreateScheduleBody): Promise<void> {
    return this.createScheduleUseCase.execute(userId, new Date(workDate), shiftHours);
  }
}
