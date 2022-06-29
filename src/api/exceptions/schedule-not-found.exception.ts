import { ScheduleNotFound } from '@domain/schedule/schedule-not-found';
import { Catch, HttpStatus } from '@nestjs/common';
import { BaseException } from '@api/exceptions/base.exception';

@Catch(ScheduleNotFound)
export class ScheduleNotFoundException extends BaseException {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}
