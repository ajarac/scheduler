import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateUserUseCase,
  CreateUserDTO,
} from '@user/application/create-user.use-case';
import { UserRole, UserRoleList } from 'src/main/user/domain/user-role';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Public } from '../../guards/public.guard';

class RegisterUserDTO implements CreateUserDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsEnum(UserRole, {
    message: 'Role should be one of: ' + UserRoleList.join(', '),
  })
  role: UserRole;
}

@Controller('users')
export class RegisterUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  register(@Body() registerUser: RegisterUserDTO): Promise<void> {
    return this.createUserUseCase.execute(registerUser);
  }
}
