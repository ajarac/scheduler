import { Nullable } from '@shared/types/nullable';
import { User } from '@domain/user/user';
import { UserStorage } from '@application/out/user.storage';
import { UserDTO } from '@application/dto/user.dto';

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

  getTopUsers(): Promise<UserDTO[]> {
    return Promise.resolve([]);
  }
}
