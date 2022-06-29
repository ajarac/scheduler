import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserDTO } from '@application/dto/user.dto';
import { GetUsersUseCase } from '@application/in/get-users.use-case';
import { ApiBearerAuth, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole, UserRoleList } from '@domain/user/user-role';
import { AdminGuard } from '@api/guards/admin.guard';

class UsersResponse implements UserDTO {
  @ApiProperty()
  id: string;
  @ApiProperty({ enum: UserRoleList })
  role: UserRole;
  @ApiProperty()
  username: string;
}

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class GetUsersController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiResponse({ type: UsersResponse })
  getAll(): Promise<UsersResponse[]> {
    return this.getUsersUseCase.execute();
  }
}
