import { Schedule } from '@schedule/domain/schedule';

import { ScheduleStorage } from '../domain/schedule.storage';

export class CreateScheduleUseCase {
  constructor(private readonly scheduleStorage: ScheduleStorage) {}

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
