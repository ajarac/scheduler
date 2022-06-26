import { Nullable } from '@shared/types/nullable';
import { User } from '@domain/user/user';
import { UserStorage } from '@application/out/user.storage';

export class DummyUserStorage implements UserStorage {
  getByUsername(): Promise<Nullable<User>> {
    return null;
  }
  create(): Promise<void> {
    return null;
  }

  delete(): Promise<void> {
    return null;
  }

  edit(): Promise<void> {
    return null;
  }

  getById(): Promise<Nullable<User>> {
    return null;
  }

  getNextId(): string {
    return '';
  }
}
