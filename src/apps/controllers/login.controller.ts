import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationUseCase } from 'src/main/user/application/in/authentication.use-case';
import { LoginUserUseCase } from 'src/apps/auth/login-user.use-case';
import { UserToken } from 'src/main/user/domain/user.token';
import { IsNotEmpty } from 'class-validator';

class Credentials {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

@Controller('user/login')
export class LoginController {
  constructor(
    private readonly authenticatoinUseCase: AuthenticationUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post()
  async login(@Body() { username, password }: Credentials): Promise<UserToken> {
    const userAuth = await this.authenticatoinUseCase.validate(
      username,
      password,
    );
    return this.loginUserUseCase.login(userAuth);
  }
}
