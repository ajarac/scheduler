import { ScheduleStorage } from '../out/schedule.storage';

export class DeleteScheduleUseCase {
  constructor(private readonly storage: ScheduleStorage) {}

  execute(scheduleId: string): Promise<void> {
    return this.storage.delete(scheduleId);
  }
}
