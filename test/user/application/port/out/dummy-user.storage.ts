import { Nullable } from '@shared/types/nullable';
import { UserStorage } from '@user/application/port/out/user.storage';
import { User } from '@user/domain/user';

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
