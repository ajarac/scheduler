import { Schedule } from '@domain/schedule/schedule';

export interface ScheduleDTO {
  id: string;
  userId: string;
  workDate: Date;
  shiftHours: number;
}
export function domainToDTO(schedule: Schedule): ScheduleDTO {
  return {
    id: schedule.getId(),
    userId: schedule.getUserId(),
    workDate: schedule.getWorkDate(),
    shiftHours: schedule.getShiftHours(),
  };
}
