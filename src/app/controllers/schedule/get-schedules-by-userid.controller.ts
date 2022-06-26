import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { GetSchedulesByUserIdUseCase } from '@application/in/get-schedules-by-userid.use-case';
import { ScheduleDTO } from '@application/dto/schedule.dto';
import { RangeDate } from '@app/controllers/dto/range-date';

@Controller('schedules')
export class GetSchedulesByUseridController {
  constructor(
    private readonly getSchedulesByUserIdUseCase: GetSchedulesByUserIdUseCase,
  ) {}

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  async get(
    @Query('from') from: string,
    @Query('to') to: string,
    @Param('userId') userId: string,
  ): Promise<ScheduleDTO[]> {
    const rangeDate = RangeDate.fromString(from, to);
    return this.getSchedulesByUserIdUseCase.execute(
      userId,
      rangeDate.from,
      rangeDate.to,
    );
  }
}
