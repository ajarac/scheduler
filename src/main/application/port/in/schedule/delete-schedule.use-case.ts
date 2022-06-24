import { ScheduleStorage } from '@application/port/out/schedule.storage';

export class DeleteScheduleUseCase {
  constructor(private readonly storage: ScheduleStorage) {}

  execute(scheduleId: string): void {
    this.storage.delete(scheduleId);
  }
}
