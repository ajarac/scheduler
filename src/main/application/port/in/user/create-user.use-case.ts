import { HashProvider } from '@application/port/out/hash.provider';
import { User } from '@domain/user/user';
import { UserRole } from '@domain/user/user-role';
import { UserStorage } from '@application/port/out/user.storage';

export class CreateUserUseCase {
  constructor(
    private readonly storage: UserStorage,
    private readonly hashProvider: HashProvider,
  ) {}

  execute({ username, password, role }: CreateUserDTO): void {
    const id = this.storage.getNextId();
    const passwordHash = this.hashProvider.hash(password);
    const user = new User(id, username, passwordHash, role);
    this.storage.create(user);
  }
}

export interface CreateUserDTO {
  username: string;
  password: string;
  role: UserRole;
}
