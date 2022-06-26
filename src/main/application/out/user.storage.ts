import { Nullable } from '@shared/types/nullable';
import { User } from '@domain/user/user';

export const USER_STORAGE_TOKEN = Symbol('USER_STORAGE_TOKEN');

export interface UserStorage {
  getNextId(): string;

  create(user: User): Promise<void>;

  getById(id: string): Promise<Nullable<User>>;

  getByUsername(username: string): Promise<Nullable<User>>;

  edit(user: User): Promise<void>;

  delete(id: string): Promise<void>;
}
