import { HashProvider } from '../out/hash.provider';
import { User } from '@domain/user/user';
import { UserNotFound } from '@domain/user/user-not-found';
import { UserRole } from '@domain/user/user-role';
import { UserStorage } from '../out/user.storage';

export class EditUserUseCase {
  constructor(
    private readonly userStorage: UserStorage,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(userId: string, editUserDTO: EditUserDTO): Promise<void> {
    const user = await this.getUserAndUpdate(userId, editUserDTO);
    this.userStorage.edit(user);
  }

  private async getUserAndUpdate(
    userId: string,
    editUserDTO: EditUserDTO,
  ): Promise<User> {
    const user = await this.getUserOrThrow(userId);

    return this.updateUser(user, editUserDTO);
  }

  private async getUserOrThrow(userId: string) {
    const user = await this.userStorage.getById(userId);

    if (user === null) {
      throw new UserNotFound(userId);
    }
    return user;
  }

  private updateUser(user: User, editUserDTO: EditUserDTO) {
    if (editUserDTO.password != null) {
      const newPassword = this.hashProvider.hash(editUserDTO.password);
      user.changePassword(newPassword);
    }
    if (editUserDTO.username != null) {
      user.updateUsername(editUserDTO.username);
    }
    if (editUserDTO.role != null) {
      user.updateRole(editUserDTO.role);
    }
    return user;
  }
}

export interface EditUserDTO {
  username?: string;
  password?: string;
  role?: UserRole;
}
