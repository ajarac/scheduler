import { TypeormUser } from './typeorm-user.entity';
import { User } from '@domain/user/user';

export class TypeormUserMapper {
  static fromDomain(user: User): TypeormUser {
    const typeormUser = new TypeormUser();
    typeormUser.id = user.getId();
    typeormUser.username = user.getUsername();
    typeormUser.password = user.getPassword();
    typeormUser.role = user.getRole();
    return typeormUser;
  }

  static toDomain(typeormUser: TypeormUser): User {
    return new User(
      typeormUser.id,
      typeormUser.username,
      typeormUser.password,
      typeormUser.role,
    );
  }
}
