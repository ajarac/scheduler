export class Schedule {
  private readonly id: string;
  private readonly workDate: Date;
  private readonly userId: string;
  private readonly shiftHours: number;

  constructor(id: string, workDate: Date, userId: string, shiftHours: number) {
    this.id = id;
    this.workDate = workDate;
    this.userId = userId;
    this.shiftHours = shiftHours;
  }
}
