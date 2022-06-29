import { Catch, HttpStatus } from '@nestjs/common';
import { SchedulesAlreadyExists } from '@domain/schedule/schedules-already-exists';
import { BaseException } from '@api/exceptions/base.exception';

@Catch(SchedulesAlreadyExists)
export class SchedulesAlreadyExistsException extends BaseException {
  constructor() {
    super(HttpStatus.BAD_REQUEST);
  }
}
