import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from '@nestjs/common';
import { GetTopUsersUseCase } from '@application/in/get-top-users.use-case';
import { AdminGuard } from '@app/guards/admin.guard';
import { Order } from '@shared/short';
import { UserDTO } from '@application/dto/user.dto';
import { Request, Response } from 'express';
import { RangeDate } from '@app/controllers/dto/range-date';

@Controller('users')
export class GetTopUsersController {
  constructor(private readonly getTopUsersUseCase: GetTopUsersUseCase) {}

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

  @Get('top')
  @UseGuards(AdminGuard)
  async getTop(
    @Query('order') order: Order,
    @Query('from') from: string,
    @Query('to') to: string,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<UserDTO> {
    const range = GetTopUsersController.checkRange(response, from, to);
    if (range == null) {
      return;
    }
    const users = await this.getTopUsersUseCase.execute(order || Order.DESC, range.from, range.to);
    response.status(HttpStatus.OK).json(users);
  }
}
