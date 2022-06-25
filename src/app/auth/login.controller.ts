import { Body, Controller, Post } from '@nestjs/common';

import { IsNotEmpty } from 'class-validator';
import { AuthenticationService } from './authentication.service';
import { LoginToken } from './dto/login-token';

class Credentials {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

@Controller('user/login')
export class LoginController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async login(
    @Body() { username, password }: Credentials,
  ): Promise<LoginToken> {
    const userAuth = await this.authenticationService.validate(
      username,
      password,
    );
    return this.authenticationService.login(userAuth);
  }
}
