import { User } from '@user/domain/user';
import { UserRole } from '@user/domain/user-role';

import { HashProvider } from '../out/hash.provider';
import { UserStorage } from '../out/user.storage';

export class CreateUserUseCase {
  constructor(
    private readonly storage: UserStorage,
    private readonly hashProvider: HashProvider,
  ) {}

  execute({ username, password, role }: CreateUserDTO): Promise<void> {
    const id = this.storage.getNextId();
    const passwordHash = this.hashProvider.hash(password);
    const user = new User(id, username, passwordHash, role);
    return this.storage.create(user);
  }
}

export interface CreateUserDTO {
  username: string;
  password: string;
  role: UserRole;
}
