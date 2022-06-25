import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegisterUserController } from './infrastructure/adapters/in/controllers/register-user.controller';
import { UserEntity } from './infrastructure/adapters/out/storage/typeorm-user.entity';
import { PROVIDERS } from './infrastructure/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [RegisterUserController],
  providers: [...PROVIDERS],
})
export class UserModule {}
