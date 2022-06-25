import { UserAuth } from '@auth/dto/user-auth';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole } from '@user/domain/user-role';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { role } = context.switchToHttp().getRequest().user as UserAuth;
    return role === UserRole.ADMIN;
  }
}
