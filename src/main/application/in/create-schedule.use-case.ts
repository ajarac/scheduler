import { Inject, Injectable } from '@nestjs/common';
import { Schedule } from '@domain/schedule/schedule';

import { SCHEDULE_STORAGE_TOKEN, ScheduleStorage } from '../out/schedule.storage';
import { SchedulesAlreadyExists } from '@domain/schedule/schedules-already-exists';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    @Inject(SCHEDULE_STORAGE_TOKEN)
    private readonly scheduleStorage: ScheduleStorage
  ) {}

  private static getFinishDate(workDate: Date, shiftHours: number): Date {
    const finishDate = new Date(workDate);
    finishDate.setHours(finishDate.getHours() + shiftHours);
    return finishDate;
  }

  async execute(userId: string, workDate: Date, shiftHours: number): Promise<void> {
    const schedulesAlreadyExists = await this.checkIfSchedulesAlreadyExists(userId, workDate, shiftHours);
    if (schedulesAlreadyExists) {
      throw new SchedulesAlreadyExists();
    }

    return this.save(userId, workDate, shiftHours);
  }

  private async checkIfSchedulesAlreadyExists(userId: string, workDate: Date, shiftHours: number): Promise<boolean> {
    const finishDate = CreateScheduleUseCase.getFinishDate(workDate, shiftHours);
    const schedules: Schedule[] = await this.scheduleStorage.search(userId, workDate, finishDate);
    return schedules.length > 0;
  }

  private async save(userId: string, workDate: Date, shiftHours: number): Promise<void> {
    const scheduleId = this.scheduleStorage.getNextId();
    const schedule = new Schedule(scheduleId, userId, new Date(workDate), shiftHours);

    return this.scheduleStorage.create(schedule);
  }
}
