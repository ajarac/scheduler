import { Inject, Injectable } from '@nestjs/common';
import { User } from '@user/domain/user';
import { UserNotFound } from '@user/domain/user-not-found';
import { UserRole } from '@user/domain/user-role';

import { HashProvider, HASH_PROVIDER_TOKEN } from '../out/hash.provider';
import { UserStorage, USER_STORAGE_TOKEN } from '../out/user.storage';

@Injectable()
export class EditUserUseCase {
  constructor(
    @Inject(USER_STORAGE_TOKEN)
    private readonly userStorage: UserStorage,
    @Inject(HASH_PROVIDER_TOKEN)
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(userId: string, editUserDTO: EditUserDTO): Promise<void> {
    const user = await this.getUserAndUpdate(userId, editUserDTO);
    return this.userStorage.edit(user);
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
