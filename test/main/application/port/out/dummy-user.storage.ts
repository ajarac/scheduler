import { Nullable } from 'src/shared/types/nullable';
import { User } from 'src/main/domain/user/user';
import { UserStorage } from '@application/port/out/user.storage';

export class DummyUserStorage implements UserStorage {
  create(user: User): void {}

  delete(id: string): void {}

  edit(user: User): void {}

  getById(id: string): Nullable<User> {
    return null;
  }

  getNextId(): string {
    return '';
  }
}
