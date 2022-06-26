import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { USER_STORAGE_TOKEN } from '@application/out/user.storage';
import { CryptoHashProvider } from '@infrastructure/provider/crypto-hash.provider';
import { TypeormUserStorage } from '@infrastructure/storage/user/typeorm-user.storage';
import { ValidateUserUseCase } from '@application/in/validate-user.use-case';
import { DeleteUserUseCase } from '@application/in/delete-user.use-case';
import { HASH_PROVIDER_TOKEN } from '@application/out/hash.provider';
import { EditUserUseCase } from '@application/in/edit-user.use-case';
import { CreateUserUseCase } from '@application/in/create-user.use-case';
import { UserEntity } from '@infrastructure/storage/entities/typeorm-user.entity';

const useCases: Provider[] = [CreateUserUseCase, DeleteUserUseCase, EditUserUseCase, ValidateUserUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: USER_STORAGE_TOKEN,
      useClass: TypeormUserStorage
    },
    {
      provide: HASH_PROVIDER_TOKEN,
      useClass: CryptoHashProvider
    },
    ...useCases
  ],
  exports: useCases
})
export class UserModule {}
