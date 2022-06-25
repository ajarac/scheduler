import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './infrastructure/out/storage/typeorm-user.entity';
import { PROVIDERS } from './infrastructure/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [...PROVIDERS],
})
export class UserModule {}
