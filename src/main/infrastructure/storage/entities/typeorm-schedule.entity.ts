import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { UserEntity } from './typeorm-user.entity';

@Entity()
export class ScheduleEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  workDate: Date;

  @Column()
  shiftHours: number;

  @ManyToOne(() => UserEntity, (user) => user.schedules)
  user: UserEntity;
}
