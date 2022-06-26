import { UserAuth } from '@app/auth/dto/user-auth';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ScheduleDTO } from '@application/dto/schedule.dto';
import { GetSchedulesByUserIdUseCase } from '@application/in/get-schedules-by-userid.use-case';
import { RangeDate } from '@app/controllers/dto/range-date';

@Controller('schedules')
export class GetMySchedulesController {
  constructor(
    private readonly getSchedulesByUserIdUseCase: GetSchedulesByUserIdUseCase,
  ) {}

  @Get('mine')
  @HttpCode(HttpStatus.ACCEPTED)
  async get(
    @Query('from') from: string,
    @Query('to') to: string,
    @Req() request: Request,
  ): Promise<ScheduleDTO[]> {
    const rangeDate = RangeDate.fromString(from, to);
    const { id } = request.user as UserAuth;
    return this.getSchedulesByUserIdUseCase.execute(
      id,
      rangeDate.from,
      rangeDate.to,
    );
  }
}
