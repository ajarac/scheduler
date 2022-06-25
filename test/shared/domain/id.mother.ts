import { faker } from '@faker-js/faker';

export class IdMother {
  static random(): string {
    return faker.datatype.uuid();
  }
}
