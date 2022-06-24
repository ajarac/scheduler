import { Schedule } from '@domain/schedule/schedule';
import { ScheduleStorage } from '@application/port/out/schedule.storage';

export class DummyScheduleStorage implements ScheduleStorage {
  getById(): Promise<Schedule> {
    return Promise.resolve(null);
  }
  getNextId(): string {
    return '';
  }
  create(): void {}
  search(): Promise<Schedule[]> {
    return Promise.resolve([]);
  }
  edit(): void {}
  delete(): void {}
}
