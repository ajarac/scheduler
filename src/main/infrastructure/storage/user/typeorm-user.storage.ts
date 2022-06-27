import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nullable } from '@shared/types/nullable';
import { User } from '@domain/user/user';
import { v4 as uuidv4 } from 'uuid';
import { UserStorage } from '@application/out/user.storage';
import { Between, EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../entities/typeorm-user.entity';
import { TypeormUserMapper } from './typeorm-user.mapper';
import { Order } from '@shared/short';
import { UserDTO } from '@application/dto/user.dto';
import { ScheduleEntity } from '@infrastructure/storage/entities/typeorm-schedule.entity';

@Injectable()
export class TypeormUserStorage implements UserStorage {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly manager: EntityManager
  ) {}

  async getByUsername(username: string): Promise<User> {
    const entity = await this.usersRepository.findOne({ where: { username } });
    return entity != null ? TypeormUserMapper.toDomain(entity) : null;
  }

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

  getTopUsers(order: Order, from: Date, to: Date): Promise<UserDTO[]> {
    const query = this.manager
      .getRepository(ScheduleEntity)
      .createQueryBuilder('schedule')
      .select(['user.id as id', 'user.username as username', 'user.role as userRole'])
      .where({ workDate: Between(from, to) })
      .addSelect('sum(schedule.shiftHours)', 'totalHours')
      .leftJoin('schedule.user', 'user')
      .groupBy('user.id')
      .orderBy('totalHours', order);

    return query.getRawMany<UserDTO>();
  }
}
