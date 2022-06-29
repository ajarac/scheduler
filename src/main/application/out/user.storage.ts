import { Nullable } from '@shared/types/nullable';
import { User } from '@domain/user/user';
import { Order } from '@shared/short';
import { UserDTO } from '@application/dto/user.dto';

export const USER_STORAGE_TOKEN = Symbol('USER_STORAGE_TOKEN');

export interface UserStorage {
  getNextId(): string;

  create(user: User): Promise<void>;

  getById(id: string): Promise<Nullable<User>>;

  getByUsername(username: string): Promise<Nullable<User>>;

  getTopUsers(order: Order, from: Date, to: Date): Promise<UserDTO[]>;

  getUsers(): Promise<User[]>;

  edit(user: User): Promise<void>;

  delete(id: string): Promise<void>;
}
