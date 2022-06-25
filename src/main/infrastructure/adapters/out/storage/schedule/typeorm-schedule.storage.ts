import { Injectable } from '@nestjs/common';
import { Schedule } from '@domain/schedule/schedule';
import { ScheduleStorage } from '@application/port/out/schedule.storage';
import { ScheduleEntity } from './typeorm-schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TypeormScheduleMapper } from './typeorm-schedule.mapper';

@Injectable()
export class TypeormScheduleStorage implements ScheduleStorage {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  getNextId(): string {
    return uuidv4();
  }
  async create(schedule: Schedule): Promise<void> {
    const entity = TypeormScheduleMapper.fromDomain(schedule);
    await this.scheduleRepository.save(entity);
  }
  async getById(scheduleId: string): Promise<Schedule> {
    const entity = await this.scheduleRepository.findOneBy({ id: scheduleId });
    return entity != null ? TypeormScheduleMapper.toDomain(entity) : null;
  }
  async search(userId: string, from: Date, to: Date): Promise<Schedule[]> {
    return [];
  }
  async edit(schedule: Schedule): Promise<void> {
    const entity = TypeormScheduleMapper.fromDomain(schedule);
    await this.scheduleRepository.update({ id: schedule.getId() }, entity);
  }
  async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete({ id });
  }
}
