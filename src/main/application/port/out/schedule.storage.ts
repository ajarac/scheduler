import { Nullable } from '@shared/types/nullable';
import { Schedule } from '@domain/schedule/schedule';

export interface ScheduleStorage {
  getNextId(): string;

  create(schedule: Schedule): void;

  getById(scheduleId: string): Promise<Nullable<Schedule>>;

  search(userId: string, from: Date, to: Date): Promise<Schedule[]>;

  edit(schedule: Schedule): void;

  delete(id: string): void;
}
