import { Inject, Injectable } from '@nestjs/common';
import { UserAuth } from 'src/apps/auth/dto/user-auth.dto';
import { HashProvider, HASH_PROVIDER_TOKEN } from '../out/hash.provider';
import { UserStorage, USER_STORAGE_TOKEN } from '../out/user.storage';

@Injectable()
export class AuthenticationUseCase {
  constructor(
    @Inject(USER_STORAGE_TOKEN)
    private readonly storage: UserStorage,
    @Inject(HASH_PROVIDER_TOKEN)
    private readonly hashProvider: HashProvider,
  ) {}

  async validate(username: string, password: string): Promise<UserAuth> {
    const user = await this.storage.getByUsername(username);
    if (user == null) {
      return null;
    }
    const hashPassword = this.hashProvider.hash(password);
    if (hashPassword !== user.getPassword()) {
      return null;
    }
    return {
      id: user.getId(),
      username: user.getUsername(),
      role: user.getRole(),
    };
  }
}
