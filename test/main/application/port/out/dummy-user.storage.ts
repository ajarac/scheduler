import { Nullable } from 'src/shared/types/nullable';
import { User } from 'src/main/domain/user/user';
import { UserStorage } from '@application/port/out/user.storage';

export class DummyUserStorage implements UserStorage {
  create(): Promise<void> {
    return Promise.resolve();
  }

  delete(): Promise<void> {
    return Promise.resolve();
  }

  edit(): Promise<void> {
    return Promise.resolve();
  }

  getById(): Promise<Nullable<User>> {
    return null;
  }

  getNextId(): string {
    return '';
  }
}
