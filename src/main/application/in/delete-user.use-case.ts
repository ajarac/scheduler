import { Inject, Injectable } from '@nestjs/common';
import { USER_STORAGE_TOKEN, UserStorage } from '../out/user.storage';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_STORAGE_TOKEN)
    private readonly userStorage: UserStorage,
  ) {}

  execute(id: string): Promise<void> {
    return this.userStorage.delete(id);
  }
}
