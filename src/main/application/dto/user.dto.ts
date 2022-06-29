import { UserRole } from '@domain/user/user-role';
import { User } from '@domain/user/user';

export interface UserDTO {
  id: string;
  username: string;
  role: UserRole;
  totalHours?: number;
}

export function userDomainToDTO(user: User): UserDTO {
  return {
    id: user.getId(),
    username: user.getUsername(),
    role: user.getRole()
  };
}
