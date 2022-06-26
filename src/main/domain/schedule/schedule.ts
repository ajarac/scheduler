export class Schedule {
  private readonly id: string;
  private readonly userId: string;
  private workDate: Date;
  private shiftHours: number;

  constructor(id: string, userId: string, workDate: Date, shiftHours: number) {
    this.id = id;
    this.userId = userId;
    this.workDate = workDate;
    this.shiftHours = shiftHours;
  }

  getId(): string {
    return this.id;
  }
  getUserId(): string {
    return this.userId;
  }

  getWorkDate(): Date {
    return this.workDate;
  }

  getShiftHours(): number {
    return this.shiftHours;
  }

  updateWorkDate(workDate: Date): void {
    this.workDate = workDate;
  }

  updateShiftHours(shiftHours: number): void {
    this.shiftHours = shiftHours;
  }
}
