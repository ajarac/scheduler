import { Column, Entity, PrimaryColumn } from 'typeorm';

import { UserRole } from '@domain/user/user-role';

@Entity()
export class TypeormUser {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
