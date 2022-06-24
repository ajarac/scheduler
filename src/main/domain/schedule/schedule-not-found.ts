export class ScheduleNotFound extends Error {
  constructor(scheduleId: string) {
    super(`Schedule not found with id: ${scheduleId}`);
  }
}
