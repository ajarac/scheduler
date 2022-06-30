import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { IsNotEmpty } from 'class-validator';
import { Public } from '../guards/public.guard';
import { AuthenticationService } from './authentication.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

class Credentials {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @Public()
  async login(@Body() { username, password }: Credentials, @Res() response: Response): Promise<void> {
    const userAuth = await this.authenticationService.validate(username, password);
    if (userAuth == null) {
      response.status(HttpStatus.UNAUTHORIZED).send();
    } else {
      const token = this.authenticationService.login(userAuth);
      response.status(HttpStatus.OK).json(token);
    }
  }
}
