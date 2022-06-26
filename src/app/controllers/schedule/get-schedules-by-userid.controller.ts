import { Controller, Get, HttpCode, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { GetSchedulesByUserIdUseCase } from '@application/in/get-schedules-by-userid.use-case';
import { ScheduleDTO } from '@application/dto/schedule.dto';
import { RangeDate } from '@app/controllers/dto/range-date';
import { Request, Response } from 'express';
import { UserAuth } from '@app/auth/dto/user-auth';

@Controller('schedules')
export class GetSchedulesByUseridController {
  constructor(private readonly getSchedulesByUserIdUseCase: GetSchedulesByUserIdUseCase) {}

  private static checkRange(response: Response, from: string, to: string): RangeDate {
    if (from == null || to == null) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'Missing from or to query' });
      return;
    }
    const rangeDate = new RangeDate(from, to);
    if (!rangeDate.isValid()) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'from date should be before of to date' });
      return;
    }
    return rangeDate;
  }

  @Get('mine')
  @HttpCode(HttpStatus.ACCEPTED)
  async getMine(
    @Query('from') from: string,
    @Query('to') to: string,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<ScheduleDTO[]> {
    const range = GetSchedulesByUseridController.checkRange(response, from, to);
    if (range == null) {
      return;
    }
    const { id } = request.user as UserAuth;
    return this.getSchedulesByUserIdUseCase.execute(id, range.from, range.to);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getById(
    @Query('from') from: string,
    @Query('to') to: string,
    @Param('userId') userId: string,
    @Res() response: Response
  ): Promise<void> {
    const range = GetSchedulesByUseridController.checkRange(response, from, to);
    if (range == null) {
      return;
    }
    const schedules = await this.getSchedulesByUserIdUseCase.execute(userId, range.from, range.to);
    response.status(HttpStatus.ACCEPTED).json(schedules);
  }
}
