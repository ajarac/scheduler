import { UserRole } from '@domain/user/user-role';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

import { ScheduleEntity } from './typeorm-schedule.entity';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.user, {
    cascade: true,
  })
  schedules: ScheduleEntity[];
}
