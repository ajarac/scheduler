import { Nullable } from '@shared/types/nullable';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStorage } from '@user/application/port/out/user.storage';
import { User } from '@user/domain/user';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './typeorm-user.entity';
import { TypeormUserMapper } from './typeorm-user.mapper';

@Injectable()
export class TypeormUserStorage implements UserStorage {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  getNextId(): string {
    return uuidv4();
  }
  async create(user: User): Promise<void> {
    const entity = TypeormUserMapper.fromDomain(user);
    await this.usersRepository.save(entity);
  }

  async getById(id: string): Promise<Nullable<User>> {
    const entity = await this.usersRepository.findOneBy({ id });
    return entity != null ? TypeormUserMapper.toDomain(entity) : null;
  }
  async edit(user: User): Promise<void> {
    const entity = TypeormUserMapper.fromDomain(user);
    await this.usersRepository.update({ id: user.getId() }, entity);
  }
  async delete(id: string): Promise<void> {
    await this.usersRepository.delete({ id });
  }
}
