import { Injectable } from '@nestjs/common';

import { ScheduleEntity } from '../entities/typeorm-schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TypeormScheduleMapper } from './typeorm-schedule.mapper';
import { Schedule } from '@domain/schedule/schedule';
import { ScheduleStorage } from '@application/out/schedule.storage';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class TypeormScheduleStorage implements ScheduleStorage {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  getNextId(): string {
    return uuidv4();
  }

  async create(schedule: Schedule): Promise<void> {
    const entity = TypeormScheduleMapper.fromDomain(schedule);
    await this.scheduleRepository.save(entity);
  }

  async getById(scheduleId: string): Promise<Schedule> {
    const entity = await this.scheduleRepository.findOne({
      relations: { user: true },
      where: { id: scheduleId },
    });
    return entity != null ? TypeormScheduleMapper.toDomain(entity) : null;
  }

  async search(userId: string, from: Date, to: Date): Promise<Schedule[]> {
    const query: FindManyOptions<ScheduleEntity> = {
      relations: { user: true },
      where: { user: { id: userId }, workDate: Between(from, to) },
    };
    const entities = await this.scheduleRepository.find(query);
    return entities.map(TypeormScheduleMapper.toDomain);
  }

  async edit(schedule: Schedule): Promise<void> {
    const entity = TypeormScheduleMapper.fromDomain(schedule);
    await this.scheduleRepository.update({ id: schedule.getId() }, entity);
  }

  async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete({ id });
  }
}
