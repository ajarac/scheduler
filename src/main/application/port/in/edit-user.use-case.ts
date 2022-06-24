import { HashProvider } from '../out/hash.provider';
import { UserRole } from '@domain/user/user-role';
import { UserStorage } from '../out/user.storage';

export class EditUserUseCase {
  constructor(
    private readonly userStorage: UserStorage,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(editUserDTO: EditUserDTO): Promise<void> {
    const user = await this.userStorage.getById(editUserDTO.id);

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

    this.userStorage.edit(user);
  }
}

export interface EditUserDTO {
  id: string;
  username?: string;
  password?: string;
  role?: UserRole;
}
