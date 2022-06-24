import { Nullable } from 'src/shared/types/nullable';
import { User } from '@domain/user/user';

export interface UserStorage {
  getNextId(): string;

  create(user: User): Promise<void>;

  getById(id: string): Promise<Nullable<User>>;

  edit(user: User): Promise<void>;

  delete(id: string): Promise<void>;
}
