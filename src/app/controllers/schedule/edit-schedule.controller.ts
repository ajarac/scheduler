import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  EditScheduleDTO,
  EditScheduleUseCase,
} from '@schedule/application/edit-schedule.use-case';
import { IsDateString, IsNumber, IsPositive } from 'class-validator';
import { AdminGuard } from 'src/app/guards/admin.guard';

class EditScheduleBody implements EditScheduleDTO {
  @IsDateString()
  workDate?: Date;
  @IsNumber()
  @IsPositive()
  shiftHours?: number;
}

@Controller('schedules')
export class EditScheduleController {
  constructor(private readonly editScheduleUseCase: EditScheduleUseCase) {}

  @Patch(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  edit(
    @Param('id') id: string,
    @Body() editScheduleBody: EditScheduleBody,
  ): Promise<void> {
    return this.editScheduleUseCase.execute(id, editScheduleBody);
  }
}
