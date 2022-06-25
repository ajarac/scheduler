import { faker } from '@faker-js/faker';
import { Schedule } from '@schedule/domain/schedule';

import { IdMother } from '../../shared/domain/id.mother';

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
