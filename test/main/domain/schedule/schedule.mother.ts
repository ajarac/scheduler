import { faker } from '@faker-js/faker';
import { IdMother } from '../id.mother';
import { DateTime } from 'luxon';
import { Schedule } from '@domain/schedule/schedule';
export class ScheduleMother {
  static randomList(size: number, userId: string = null): Schedule[] {
    return new Array(size).fill(null).map(() => this.random(userId));
  }

  static random(userId: string = null): Schedule {
    return new Schedule(IdMother.random(), userId || IdMother.random(), this.workDate(), this.shiftHours());
  }

  static yearAgo(): Date {
    return DateTime.now().minus({ years: 1 }).toJSDate();
  }

  static workDate(): Date {
    return faker.date.between(this.yearAgo(), new Date());
  }

  static shiftHours(): number {
    return faker.datatype.number(8);
  }
}
