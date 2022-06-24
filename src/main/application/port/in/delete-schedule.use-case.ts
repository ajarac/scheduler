import { ScheduleStorage } from '../out/schedule.storage';

export class DeleteScheduleUseCase {
  constructor(private readonly storage: ScheduleStorage) {}

  execute(scheduleId: string): void {
    this.storage.delete(scheduleId);
  }
}
