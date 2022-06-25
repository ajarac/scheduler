import { UserRole } from 'src/main/user/domain/user-role';

export interface UserAuth {
  id: string;
  username: string;
  role: UserRole;
}
