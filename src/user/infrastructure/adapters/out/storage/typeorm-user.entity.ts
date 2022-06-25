import { UserRole } from '@user/domain/user-role';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
