import { Inject, Injectable } from '@nestjs/common';
import { HASH_PROVIDER_TOKEN, HashProvider } from '../out/hash.provider';
import { User } from '@domain/user/user';
import { USER_STORAGE_TOKEN, UserStorage } from '../out/user.storage';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(USER_STORAGE_TOKEN)
    private readonly storage: UserStorage,
    @Inject(HASH_PROVIDER_TOKEN)
    private readonly hashProvider: HashProvider
  ) {}

  async execute(username: string, password: string): Promise<User> {
    const user = await this.storage.getByUsername(username);
    if (user == null) {
      return null;
    }
    const hashPassword = this.hashProvider.hash(password);
    if (hashPassword !== user.getPassword()) {
      return null;
    }
    return user;
  }
}
