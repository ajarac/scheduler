import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO, CreateUserUseCase } from '@application/in/create-user.use-case';
import { UserRole, UserRoleList } from 'src/main/domain/user/user-role';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Public } from '@api/guards/public.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

class RegisterUserDTO implements CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsEnum(UserRole, {
    message: 'Role should be one of: ' + UserRoleList.join(', ')
  })
  @ApiProperty({ enum: UserRoleList })
  role: UserRole;
}

@ApiTags('users')
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
