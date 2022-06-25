import { UserAuth } from '@auth/dto/user-auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Nullable } from '@shared/types/nullable';
import { ValidateUserUseCase } from '@user/application/validate-user.use-case';

import { LoginToken } from './dto/login-token';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async validate(
    username: string,
    password: string,
  ): Promise<Nullable<UserAuth>> {
    const user = await this.validateUserUseCase.execute(username, password);

    if (user == null) {
      return null;
    }

    return {
      id: user.getId(),
      username: user.getUsername(),
      role: user.getRole(),
    };
  }

  login(userAuth: UserAuth): LoginToken {
    return {
      accessToken: this.jwtService.sign(userAuth),
    };
  }
}
