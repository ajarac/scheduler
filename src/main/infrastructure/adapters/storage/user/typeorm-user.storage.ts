import { Nullable } from '@shared/types/nullable';
import { User } from '@domain/user/user';
import { UserStorage } from '@application/port/out/user.storage';
import { TypeormUser } from './typeorm-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TypeormUserMapper } from './typeorm-user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormUserStorage implements UserStorage {
  constructor(
    @InjectRepository(TypeormUser)
    private usersRepository: Repository<TypeormUser>,
  ) {}

  getNextId(): string {
    return uuidv4();
  }
  async create(user: User): Promise<void> {
    const typeormUser = TypeormUserMapper.fromDomain(user);
    await this.usersRepository.save(typeormUser);
  }

  async getById(id: string): Promise<Nullable<User>> {
    const typeormUser = await this.usersRepository.findOneBy({ id });
    return typeormUser != null ? TypeormUserMapper.toDomain(typeormUser) : null;
  }
  async edit(user: User): Promise<void> {
    const typeormOrm = TypeormUserMapper.fromDomain(user);
    await this.usersRepository.update({ id: user.getId() }, typeormOrm);
  }
  async delete(id: string): Promise<void> {
    await this.usersRepository.delete({ id });
  }
}
