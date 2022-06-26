import { Inject, Injectable } from '@nestjs/common';
import {
  ScheduleStorage,
  SCHEDULE_STORAGE_TOKEN,
} from '../out/schedule.storage';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(
    @Inject(SCHEDULE_STORAGE_TOKEN) private readonly storage: ScheduleStorage,
  ) {}

  execute(scheduleId: string): Promise<void> {
    return this.storage.delete(scheduleId);
  }
}
