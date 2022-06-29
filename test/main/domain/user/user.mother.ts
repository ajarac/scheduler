import { faker } from '@faker-js/faker';
import { IdMother } from '../id.mother';
import { User } from '@domain/user/user';
import { UserRole } from '@domain/user/user-role';

export class UserMother {
  static random(): User {
    return new User(IdMother.random(), this.userName(), this.password(), this.role());
  }

  static randomList(size: number): User[] {
    return new Array(size).fill(null).map(() => this.random());
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
