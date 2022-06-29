import { Response } from 'express';
import { RangeDate } from '../controllers/dto/range-date';
import { HttpStatus } from '@nestjs/common';

export class RangeService {
  static checkRange(response: Response, from: string, to: string): RangeDate {
    if (from == null || to == null) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'Missing from or to query' });
      return;
    }
    const rangeDate = new RangeDate(from, to);
    if (!rangeDate.isValid()) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'from date should be before of to date' });
      return;
    }
    return rangeDate;
  }
}
