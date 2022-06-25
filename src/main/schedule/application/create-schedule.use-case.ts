import { Inject, Injectable } from '@nestjs/common';
import { Schedule } from '@schedule/domain/schedule';

import {
  ScheduleStorage,
  SCHEDULE_STORAGE_TOKEN,
} from '../domain/schedule.storage';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    @Inject(SCHEDULE_STORAGE_TOKEN)
    private readonly scheduleStorage: ScheduleStorage,
  ) {}

  async execute({
    userId,
    workDate,
    shiftHours,
  }: CreateScheduleDTO): Promise<void> {
    const scheduleId = this.scheduleStorage.getNextId();
    const schedule = new Schedule(scheduleId, userId, workDate, shiftHours);
    return this.scheduleStorage.create(schedule);
  }
}

export interface CreateScheduleDTO {
  workDate: Date;
  userId: string;
  shiftHours: number;
}
