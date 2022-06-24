import { User } from '@domain/user/user';
import { faker } from '@faker-js/faker';
import { UserRole } from '@domain/user/user-role';

export class UserMother {
  static random(): User {
    return new User(
      faker.datatype.uuid(),
      faker.internet.userName(),
      faker.internet.password(),
      faker.helpers.arrayElement([UserRole.STAFF, UserRole.ADMIN]),
    );
  }
}
