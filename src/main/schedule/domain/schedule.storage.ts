import { Nullable } from '@shared/types/nullable';

import { Schedule } from './schedule';

export interface ScheduleStorage {
  getNextId(): string;

  create(schedule: Schedule): Promise<void>;

  getById(scheduleId: string): Promise<Nullable<Schedule>>;

  search(userId: string, from: Date, to: Date): Promise<Schedule[]>;

  edit(schedule: Schedule): Promise<void>;

  delete(id: string): Promise<void>;
}
