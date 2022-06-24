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

  async execute(editUserDTO: EditUserDTO): Promise<void> {
    const user = await this.getUserAndUpdate(editUserDTO);
    this.userStorage.edit(user);
  }

  private async getUserAndUpdate(editUserDTO: EditUserDTO): Promise<User> {
    const user = await this.getUserOrThrow(editUserDTO.id);

    return this.updateUser(editUserDTO, user);
  }

  private async getUserOrThrow(userId: string) {
    const user = await this.userStorage.getById(userId);

    if (user === null) {
      throw new UserNotFound(userId);
    }
    return user;
  }

  private updateUser(editUserDTO: EditUserDTO, user: User) {
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
  id: string;
  username?: string;
  password?: string;
  role?: UserRole;
}
