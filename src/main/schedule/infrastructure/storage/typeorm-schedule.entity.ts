import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ScheduleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  workDate: Date;

  @Column()
  shiftHours: number;
}
