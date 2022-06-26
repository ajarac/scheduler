import { Nullable } from '@shared/types/nullable';

import { UserRole } from './user-role';

export class User {
  private readonly id: string;
  private username: string;
  private password: Nullable<string>;
  private role: UserRole;

  constructor(
    id: string,
    username: string,
    password: Nullable<string>,
    role: UserRole,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): UserRole {
    return this.role;
  }

  changePassword(password: string): void {
    this.password = password;
  }

  updateUsername(username: string): void {
    this.username = username;
  }

  updateRole(role: UserRole): void {
    this.role = role;
  }
}
