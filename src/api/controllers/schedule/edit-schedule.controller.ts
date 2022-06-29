import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { EditScheduleDTO, EditScheduleUseCase } from '@application/in/edit-schedule.use-case';
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { AdminGuard } from '@api/guards/admin.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

class EditScheduleBody implements EditScheduleDTO {
  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  workDate: Date;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  shiftHours: number;
}

@ApiBearerAuth()
@ApiTags('schedules')
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
