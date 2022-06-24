import { Nullable } from 'src/shared/types/nullable';
import { User } from 'src/main/domain/user/user';
import { UserStorage } from '@application/port/out/user.storage';

export class DummyUserStorage implements UserStorage {
  create(): void {}

  delete(): void {}

  edit(): void {}

  getById(): Promise<Nullable<User>> {
    return null;
  }

  getNextId(): string {
    return '';
  }
}
