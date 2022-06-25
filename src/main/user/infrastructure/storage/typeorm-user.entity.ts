import { UserRole } from '@user/domain/user-role';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
