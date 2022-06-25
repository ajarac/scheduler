import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ScheduleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  workDate: Date;

  @Column()
  shiftHours: number;
}
