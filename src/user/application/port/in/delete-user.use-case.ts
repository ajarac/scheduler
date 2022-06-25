import { UserStorage } from '../out/user.storage';

export class DeleteUserUseCase {
  constructor(private readonly userStorage: UserStorage) {}

  execute(id: string): Promise<void> {
    return this.userStorage.delete(id);
  }
}
