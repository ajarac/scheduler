import { Inject, Injectable } from '@nestjs/common';
import { User } from '@user/domain/user';
import { UserRole } from '@user/domain/user-role';

import { HashProvider, HASH_PROVIDER_TOKEN } from '../out/hash.provider';
import { UserStorage, USER_STORAGE_TOKEN } from '../out/user.storage';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_STORAGE_TOKEN)
    private readonly storage: UserStorage,
    @Inject(HASH_PROVIDER_TOKEN)
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
