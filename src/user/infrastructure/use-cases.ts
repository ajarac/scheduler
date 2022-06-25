import { Provider } from '@nestjs/common';
import { CreateUserUseCase } from '@user/application/port/in/create-user.use-case';
import { DeleteUserUseCase } from '@user/application/port/in/delete-user.use-case';
import { EditUserUseCase } from '@user/application/port/in/edit-user.use-case';
import { HASH_PROVIDER_TOKEN } from '@user/application/port/out/hash.provider';
import { USER_STORAGE_TOKEN } from '@user/application/port/out/user.storage';

import { CryptoHashProvider } from './adapters/out/provider/crypto-hash.provider';
import { TypeormUserStorage } from './adapters/out/storage/typeorm-user.storage';

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
