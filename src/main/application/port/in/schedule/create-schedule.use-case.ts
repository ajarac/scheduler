import { Schedule } from '@domain/schedule/schedule';
import { ScheduleStorage } from '@application/port/out/schedule.storage';
import { UserNotFound } from '@domain/user/user-not-found';
import { UserStorage } from '@application/port/out/user.storage';

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
    const user = this.userStorage.getById(userId);
    if (user === null) {
      throw new UserNotFound(userId);
    }
    const scheduleId = this.scheduleStorage.getNextId();
    const schedule = new Schedule(scheduleId, userId, workDate, shiftHours);
    this.scheduleStorage.create(schedule);
  }
}

export interface CreateScheduleDTO {
  workDate: Date;
  userId: string;
  shiftHours: number;
}
