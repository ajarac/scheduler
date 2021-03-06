import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { DeleteScheduleUseCase } from '@application/in/delete-schedule.use-case';
import { AdminGuard } from '@api/guards/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('schedules')
@Controller('schedules')
export class DeleteScheduleController {
  constructor(private readonly deleteScheduleUseCase: DeleteScheduleUseCase) {}

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteScheduleUseCase.execute(id);
  }
}
