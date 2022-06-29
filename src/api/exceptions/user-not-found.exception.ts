import { Catch, HttpStatus } from '@nestjs/common';
import { UserNotFound } from '@domain/user/user-not-found';
import { BaseException } from '@api/exceptions/base.exception';

@Catch(UserNotFound)
export class UserNotFoundException extends BaseException {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}
