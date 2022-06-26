import { faker } from '@faker-js/faker';
import { Schedule } from '@schedule/domain/schedule';
import { IdMother } from '@test/shared/domain/id.mother';

export class ScheduleMother {
  static randomList(size: number, userId: string = null): Schedule[] {
    return new Array(size).fill(null).map(() => this.random(userId));
  }

  static random(userId: string = null): Schedule {
    return new Schedule(
      IdMother.random(),
      userId || IdMother.random(),
      this.workDate(),
      this.shiftHours(),
    );
  }

  static yearAgo(): Date {
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    return yearAgo;
  }

  static workDate(): Date {
    return faker.date.between(this.yearAgo(), new Date());
  }

  static shiftHours(): number {
    return faker.datatype.number(8);
  }
}
