import { Schedule } from '@domain/schedule/schedule';
import { ScheduleEntity } from '../entities/typeorm-schedule.entity';
import { UserEntity } from '../entities/typeorm-user.entity';

export class TypeormScheduleMapper {
  static fromDomain(schedule: Schedule): ScheduleEntity {
    const userEntity = new UserEntity();
    userEntity.id = schedule.getUserId();
    const entity = new ScheduleEntity();
    entity.id = schedule.getId();
    entity.user = userEntity;
    entity.workDate = schedule.getWorkDate();
    entity.shiftHours = schedule.getShiftHours();
    return entity;
  }

  static toDomain(entity: ScheduleEntity): Schedule {
    return new Schedule(entity.id, entity.user.id, entity.workDate, entity.shiftHours);
  }
}
