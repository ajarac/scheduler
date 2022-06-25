import { Schedule } from '@schedule/domain/schedule';
import { UserStorage } from '@user/application/port/out/user.storage';
import { UserNotFound } from '@user/domain/user-not-found';

import { ScheduleStorage } from '../out/schedule.storage';

export class CreateScheduleUseCase {
  constructor(
    private readonly userStorage: UserStorage,
    private readonly scheduleStorage: ScheduleStorage,
  ) {}

  async execute({
    userId,
    workDate,
    shiftHours,
  }: CreateScheduleDTO): Promise<void> {
    const user = await this.userStorage.getById(userId);
    if (user === null) {
      return Promise.reject(new UserNotFound(userId));
    }
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
