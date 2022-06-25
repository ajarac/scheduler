import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from './application/create-user.use-case';
import { DeleteUserUseCase } from './application/delete-user.use-case';
import { EditUserUseCase } from './application/edit-user.use-case';
import { ValidateUserUseCase } from './application/validate-user.use-case';
import { HASH_PROVIDER_TOKEN } from './domain/hash.provider';
import { USER_STORAGE_TOKEN } from './domain/user.storage';
import { CryptoHashProvider } from './infrastructure/provider/crypto-hash.provider';
import { UserEntity } from './infrastructure/storage/typeorm-user.entity';
import { TypeormUserStorage } from './infrastructure/storage/typeorm-user.storage';

const useCases: Provider[] = [
  CreateUserUseCase,
  DeleteUserUseCase,
  EditUserUseCase,
  ValidateUserUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: USER_STORAGE_TOKEN,
      useClass: TypeormUserStorage,
    },
    {
      provide: HASH_PROVIDER_TOKEN,
      useClass: CryptoHashProvider,
    },
    ...useCases,
  ],
  exports: useCases,
})
export class UserModule {}
