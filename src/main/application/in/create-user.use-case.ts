import { Injectable, Inject } from '@nestjs/common';
import { HASH_PROVIDER_TOKEN, HashProvider } from '../out/hash.provider';
import { User } from '@domain/user/user';
import { UserRole } from '@domain/user/user-role';
import { USER_STORAGE_TOKEN, UserStorage } from '../out/user.storage';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_STORAGE_TOKEN)
    private readonly storage: UserStorage,
    @Inject(HASH_PROVIDER_TOKEN)
    private readonly hashProvider: HashProvider
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
