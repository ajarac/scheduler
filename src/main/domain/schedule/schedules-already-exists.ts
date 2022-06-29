export class SchedulesAlreadyExists extends Error {
  constructor() {
    super('Schedules with this time already exist');
  }
}
