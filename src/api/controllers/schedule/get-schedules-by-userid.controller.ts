import { Controller, Get, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { GetSchedulesByUserIdUseCase } from '@application/in/get-schedules-by-userid.use-case';
import { ScheduleDTO } from '@application/dto/schedule.dto';
import { Request, Response } from 'express';
import { UserAuth } from '@api/auth/dto/user-auth';
import { RangeService } from '@api/services/range.service';
import { ApiBearerAuth, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class ScheduleResponse implements ScheduleDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  shiftHours: number;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  workDate: Date;
}

@ApiBearerAuth()
@ApiTags('schedules')
@Controller('schedules')
export class GetSchedulesByUseridController {
  constructor(private readonly getSchedulesByUserIdUseCase: GetSchedulesByUserIdUseCase) {}

  @Get('mine')
  @ApiResponse({ type: ScheduleResponse })
  async getMine(
    @Query('from') from: string,
    @Query('to') to: string,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Array<ScheduleResponse>> {
    const range = RangeService.checkRange(response, from, to);
    if (range == null) {
      return;
    }
    const { id } = request.user as UserAuth;
    const schedules = await this.getSchedulesByUserIdUseCase.execute(id, range.from, range.to);
    response.status(HttpStatus.ACCEPTED).json(schedules);
  }

  @Get(':userId')
  async getById(
    @Query('from') from: string,
    @Query('to') to: string,
    @Param('userId') userId: string,
    @Res() response: Response
  ): Promise<void> {
    const range = RangeService.checkRange(response, from, to);
    if (range == null) {
      return;
    }
    const schedules = await this.getSchedulesByUserIdUseCase.execute(userId, range.from, range.to);
    response.status(HttpStatus.ACCEPTED).json(schedules);
  }
}
