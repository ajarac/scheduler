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
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'the range must be up to 1 year' });
      return;
    }
    return rangeDate;
  }
}
