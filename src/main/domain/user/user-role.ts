export enum UserRole {
  STAFF = 'STAFF',
  ADMIN = 'ADMIN'
}

export const UserRoleList = Object.keys(UserRole).map((key) => UserRole[key]);
