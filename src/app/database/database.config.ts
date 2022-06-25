import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ScheduleEntity } from '@schedule/infrastructure/storage/typeorm-schedule.entity';
import { UserEntity } from '@user/infrastructure/storage/typeorm-user.entity';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'mysql',
  password: process.env.DB_PASSWORD || 'mysqlpassword',
  database: process.env.DB_DATABASE || 'scheduler',
  entities: [UserEntity, ScheduleEntity],
  synchronize: true,
};
