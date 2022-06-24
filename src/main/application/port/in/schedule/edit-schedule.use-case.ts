import { Schedule } from '@domain/schedule/schedule';
import { ScheduleNotFound } from '@domain/schedule/schedule-not-found';
import { ScheduleStorage } from '@application/port/out/schedule.storage';

export class EditScheduleUseCase {
  constructor(private readonly storage: ScheduleStorage) {}

  async execute(
    scheduleId: string,
    editScheduleDTO: EditScheduleDTO,
  ): Promise<void> {
    const schedule = await this.getScheduleAndUpdate(
      scheduleId,
      editScheduleDTO,
    );
    this.storage.edit(schedule);
  }
  private async getScheduleAndUpdate(
    scheduleId: any,
    editScheduleDTO: EditScheduleDTO,
  ): Promise<Schedule> {
    const schedule = await this.getScheduleOrThrow(scheduleId);
    return this.updateSchedule(schedule, editScheduleDTO);
  }

  private async getScheduleOrThrow(scheduleId: string): Promise<Schedule> {
    const schedule = await this.storage.getById(scheduleId);

    if (schedule == null) {
      throw new ScheduleNotFound(scheduleId);
    }
    return schedule;
  }

  private updateSchedule(
    schedule: Schedule,
    { workDate, shiftHours }: EditScheduleDTO,
  ): Schedule | PromiseLike<Schedule> {
    if (workDate != null) {
      schedule.updateWorkDate(workDate);
    }
    if (shiftHours != null) {
      schedule.updateShiftHours(shiftHours);
    }
    return schedule;
  }
}

export interface EditScheduleDTO {
  workDate?: Date;
  shiftHours?: number;
}
