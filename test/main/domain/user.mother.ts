import { IdMother } from './id.mother';
import { User } from '@domain/user/user';
import { UserRole } from '@domain/user/user-role';
import { faker } from '@faker-js/faker';

export class UserMother {
  static random(): User {
    return new User(
      IdMother.random(),
      this.userName(),
      this.password(),
      this.role(),
    );
  }

  static userName(): string {
    return faker.internet.userName();
  }

  static password(): string {
    return faker.internet.password();
  }

  static role(): UserRole {
    return faker.helpers.arrayElement([UserRole.STAFF, UserRole.ADMIN]);
  }
}
