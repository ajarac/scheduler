import { Inject, Injectable } from '@nestjs/common';
import { Order } from '@shared/short';
import { UserDTO } from '@application/dto/user.dto';
import { USER_STORAGE_TOKEN, UserStorage } from '@application/out/user.storage';

@Injectable()
export class GetTopUsersUseCase {
  constructor(@Inject(USER_STORAGE_TOKEN) private readonly userStorage: UserStorage) {}

  async execute(order: Order, from: Date, to: Date): Promise<UserDTO[]> {
    return await this.userStorage.getTopUsers(order, from, to);
  }
}
