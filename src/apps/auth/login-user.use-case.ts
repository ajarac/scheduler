import { Inject, Injectable } from '@nestjs/common';
import { UserAuth } from 'src/apps/auth/dto/user-auth.dto';
import { UserToken } from 'src/main/user/domain/user.token';
import { TokenProvider, TOKEN_PROVIDER_TOKEN } from '../../main/user/application/out/token.provider';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(TOKEN_PROVIDER_TOKEN) private readonly tokenProvider: TokenProvider,
  ) {}

  login(userAuth: UserAuth): UserToken {
    return this.tokenProvider.sign(userAuth);
  }
}
