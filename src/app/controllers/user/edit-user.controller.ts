import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  EditUserDTO,
  EditUserUseCase,
} from '@user/application/edit-user.use-case';
import { UserRole, UserRoleList } from '@user/domain/user-role';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AdminGuard } from 'src/app/guards/admin.guard';

class EditUserBody implements EditUserDTO {
  @IsOptional()
  @IsNotEmpty()
  username: string;
  @IsOptional()
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Role should be one of: ' + UserRoleList.join(', '),
  })
  role: UserRole;
}

@Controller('users')
export class EditUserController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  @Patch(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  edit(@Param('id') id: string, @Body() editUser: EditUserBody): Promise<void> {
    return this.editUserUseCase.execute(id, editUser);
  }
}
