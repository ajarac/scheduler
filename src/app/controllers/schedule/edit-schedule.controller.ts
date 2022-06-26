import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { EditScheduleDTO, EditScheduleUseCase } from '@application/in/edit-schedule.use-case';
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { AdminGuard } from '@app/guards/admin.guard';

class EditScheduleBody implements EditScheduleDTO {
  @IsDateString()
  @IsOptional()
  workDate: Date;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  shiftHours: number;
}

@Controller('schedules')
export class EditScheduleController {
  constructor(private readonly editScheduleUseCase: EditScheduleUseCase) {}

  @Patch(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  edit(@Param('id') id: string, @Body() editScheduleBody: EditScheduleBody): Promise<void> {
    return this.editScheduleUseCase.execute(id, editScheduleBody);
  }
}
