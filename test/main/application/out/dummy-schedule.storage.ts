import { ScheduleStorage } from '@application/out/schedule.storage';
import { Schedule } from '@domain/schedule/schedule';

export class DummyScheduleStorage implements ScheduleStorage {
  getById(): Promise<Schedule> {
    return Promise.resolve(null);
  }
  getNextId(): string {
    return '';
  }
  create(): Promise<void> {
    return Promise.resolve();
  }
  search(): Promise<Schedule[]> {
    return Promise.resolve([]);
  }
  edit(): Promise<void> {
    return Promise.resolve();
  }
  delete(): Promise<void> {
    return Promise.resolve();
  }
}
