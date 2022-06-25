import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateUserUseCase,
  CreateUserDTO,
} from '@user/application/port/in/create-user.use-case';
import { UserRole } from '@user/domain/user-role';
import { IsEnum, IsNotEmpty } from 'class-validator';

@Controller('register')
export class RegisterUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  register(@Body() registerUser: RegisterUserDTO): Promise<void> {
    return this.createUserUseCase.execute(registerUser);
  }
}

class RegisterUserDTO implements CreateUserDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsEnum(UserRole)
  role: UserRole;
}
