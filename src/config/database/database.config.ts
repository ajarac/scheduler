import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ScheduleEntity } from '@schedule/storage/typeorm-schedule.entity';
import { UserEntity } from '@user/infrastructure/adapters/out/storage/typeorm-user.entity';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'scheduler',
  entities: [UserEntity, ScheduleEntity],
  synchronize: true,
};
