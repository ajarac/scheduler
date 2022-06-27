import { UserRole } from '@domain/user/user-role';
import { User } from '@domain/user/user';

export interface UserDTO {
  id: string;
  username: string;
  role: UserRole;
  workHours: number;
}

export function userDomainToDTO(user: User, hours: number): UserDTO {
  return {
    id: user.getId(),
    username: user.getUsername(),
    role: user.getRole(),
    workHours: hours
  };
}
