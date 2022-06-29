import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { EditUserDTO, EditUserUseCase } from '@application/in/edit-user.use-case';
import { UserRole, UserRoleList } from '@domain/user/user-role';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AdminGuard } from '@api/guards/admin.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

class EditUserBody implements EditUserDTO {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  username: string;
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  password: string;
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Role should be one of: ' + UserRoleList.join(', ')
  })
  @ApiProperty({ required: false, enum: UserRoleList })
  role: UserRole;
}

@ApiBearerAuth()
@ApiTags('users')
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
