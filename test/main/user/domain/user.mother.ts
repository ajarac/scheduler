import { faker } from '@faker-js/faker';
import { IdMother } from '@test/shared/domain/id.mother';
import { User } from '@user/domain/user';
import { UserRole } from '@user/domain/user-role';

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
