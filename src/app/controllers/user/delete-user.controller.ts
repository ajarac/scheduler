import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DeleteUserUseCase } from '@application/in/delete-user.use-case';
import { AdminGuard } from '@app/guards/admin.guard';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
}
