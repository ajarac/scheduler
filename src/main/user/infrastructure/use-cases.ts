import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '@user/application/create-user.use-case';
import { DeleteUserUseCase } from '@user/application/delete-user.use-case';
import { EditUserUseCase } from '@user/application/edit-user.use-case';
import { HASH_PROVIDER_TOKEN } from '@user/domain/hash.provider';
import { USER_STORAGE_TOKEN } from '@user/domain/user.storage';

import { CryptoHashProvider } from './provider/crypto-hash.provider';
import { TypeormUserStorage } from './storage/typeorm-user.storage';

export const PROVIDERS: Provider[] = [
  {
    provide: USER_STORAGE_TOKEN,
    useClass: TypeormUserStorage,
  },
  {
    provide: HASH_PROVIDER_TOKEN,
    useClass: CryptoHashProvider,
  },
  CreateUserUseCase,
  DeleteUserUseCase,
  EditUserUseCase,
];
