import { Schedule } from '@domain/schedule/schedule';

export interface ScheduleStorage {
  create(schedule: Schedule): void;

  search(userId: string, from: Date, to: Date): Promise<Schedule[]>;

  edit(schedule: Schedule): void;

  delete(id: string): void;
}
