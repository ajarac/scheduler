import { UserRole } from '@domain/user/user-role';

export interface UserAuth {
  id: string;
  username: string;
  role: UserRole;
}
