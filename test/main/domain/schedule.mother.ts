import { IdMother } from './id.mother';
import { Schedule } from '@domain/schedule/schedule';
import { faker } from '@faker-js/faker';

export class ScheduleMother {
  static random(): Schedule {
    return new Schedule(
      IdMother.random(),
      IdMother.random(),
      this.workDate(),
      this.shiftHours(),
    );
  }

  static workDate(): Date {
    return faker.datatype.datetime();
  }

  static shiftHours(): number {
    return faker.datatype.number(8);
  }
}
