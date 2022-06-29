import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from '@nestjs/common';
import { GetTopUsersUseCase } from '@application/in/get-top-users.use-case';
import { AdminGuard } from '@api/guards/admin.guard';
import { Order } from '@shared/short';
import { UserDTO } from '@application/dto/user.dto';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole, UserRoleList } from '@domain/user/user-role';
import { RangeService } from '@api/services/range.service';

class TopUsersResponse implements UserDTO {
  @ApiProperty()
  id: string;
  @ApiProperty({ enum: UserRoleList })
  role: UserRole;
  @ApiProperty()
  totalHours: number;
  @ApiProperty()
  username: string;
}

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class GetTopUsersController {
  constructor(private readonly getTopUsersUseCase: GetTopUsersUseCase) {}

  @Get('top')
  @UseGuards(AdminGuard)
  @ApiResponse({ type: TopUsersResponse })
  async getTop(
    @Query('order') order: Order,
    @Query('from') from: string,
    @Query('to') to: string,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Array<TopUsersResponse>> {
    const range = RangeService.checkRange(response, from, to);
    if (range == null) {
      return;
    }
    const users = await this.getTopUsersUseCase.execute(order || Order.DESC, range.from, range.to);
    response.status(HttpStatus.OK).json(users);
  }
}
