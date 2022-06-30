import { DateTime, Interval } from 'luxon';

export class RangeDate {
  private readonly fromDate: DateTime;
  private readonly toDate: DateTime;

  constructor(from: string, to: string) {
    this.fromDate = DateTime.fromISO(from);
    this.toDate = DateTime.fromISO(to);
  }

  get from(): Date {
    return this.fromDate.toJSDate();
  }

  get to(): Date {
    return this.toDate.toJSDate();
  }

  isValid(): boolean {
    const interval = Interval.fromDateTimes(this.fromDate, this.toDate);
    return interval.isValid && interval.length('year') <= 1;
  }
}
