import { Schedule } from '@domain/schedule/schedule';
import { ScheduleStorage } from '@application/port/out/schedule.storage';

export class DummyScheduleStorage implements ScheduleStorage {
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
