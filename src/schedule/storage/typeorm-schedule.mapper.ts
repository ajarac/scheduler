import { Schedule } from '@schedule/domain/schedule';

import { ScheduleEntity } from './typeorm-schedule.entity';

export class TypeormScheduleMapper {
  static fromDomain(schedule: Schedule): ScheduleEntity {
    const entity = new ScheduleEntity();
    entity.id = schedule.getId();
    entity.userId = schedule.getUserId();
    entity.workDate = schedule.getWorkDate();
    entity.shiftHours = schedule.getShiftHours();
    return entity;
  }

  static toDomain({
    id,
    userId,
    workDate,
    shiftHours,
  }: ScheduleEntity): Schedule {
    return new Schedule(id, userId, workDate, shiftHours);
  }
}
