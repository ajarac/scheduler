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

  async execute(createScheduleDTO: CreateScheduleDTO): Promise<void> {
    const schedulesAlreadyExists = await this.checkIfSchedulesAlreadyExists(createScheduleDTO);
    if (schedulesAlreadyExists) {
      throw new SchedulesAlreadyExists();
    }

    return this.save(createScheduleDTO);
  }

  private async checkIfSchedulesAlreadyExists({ userId, workDate, shiftHours }: CreateScheduleDTO): Promise<boolean> {
    const finishDate = CreateScheduleUseCase.getFinishDate(workDate, shiftHours);
    const schedules: Schedule[] = await this.scheduleStorage.search(userId, workDate, finishDate);
    return schedules.length > 0;
  }

  private async save({ userId, workDate, shiftHours }: CreateScheduleDTO): Promise<void> {
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
