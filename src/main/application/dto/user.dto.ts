import { UserRole } from '@domain/user/user-role';

export interface UserDTO {
  id: string;
  username: string;
  role: UserRole;
  totalHours: number;
}
