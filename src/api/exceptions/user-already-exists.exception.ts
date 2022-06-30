import { BaseException } from '@api/exceptions/base.exception';
import { Catch, HttpStatus } from '@nestjs/common';
import { UserAlreadyExists } from '@domain/user/user-already-exists';

@Catch(UserAlreadyExists)
export class UserAlreadyExistsException extends BaseException {
  constructor() {
    super(HttpStatus.BAD_REQUEST);
  }
}
