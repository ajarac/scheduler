import { DateTime } from 'luxon';

export class RangeDate {
  constructor(public readonly from: Date, public readonly to: Date) {}

  static weekAfter(from: Date): Date {
    return DateTime.fromJSDate(from).plus({ days: 7 }).toJSDate();
  }

  static checkFrom(from: string): Date {
    const now = new Date();
    if (from == null) {
      return now;
    }
    const fromDate = new Date(from);
    if (fromDate.getTime() < now.getTime()) {
      return now;
    }
    if (from) return fromDate;
  }

  static checkTo(from: Date, to: string): Date {
    const toDate = new Date(to || null);
    const yearsDiff = DateTime.fromJSDate(toDate).diff(DateTime.now()).years;
    if (yearsDiff > 1) {
      return DateTime.now().plus({ years: 1 }).toJSDate();
    }
    if (toDate.getTime() < from.getTime()) {
      return this.weekAfter(from);
    }
    return toDate;
  }

  static fromString(from: string, to: string): RangeDate {
    const fromDate = this.checkFrom(from);
    const toDate = this.checkTo(fromDate, to);
    return new RangeDate(fromDate, toDate);
  }
}
