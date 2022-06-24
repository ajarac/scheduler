import { UserStorage } from '../out/user.storage';

export class DeleteUserUseCase {
  constructor(private readonly userStorage: UserStorage) {}

  execute(id: string): void {
    this.userStorage.delete(id);
  }
}
