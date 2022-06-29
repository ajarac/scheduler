import { Inject, Injectable } from '@nestjs/common';
import { USER_STORAGE_TOKEN, UserStorage } from '@application/out/user.storage';
import { userDomainToDTO, UserDTO } from '@application/dto/user.dto';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_STORAGE_TOKEN)
    private readonly storage: UserStorage
  ) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.storage.getUsers();
    return users.map(userDomainToDTO);
  }
}
