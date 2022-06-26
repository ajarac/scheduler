import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@infrastructure/storage/entities/typeorm-user.entity';
import { ScheduleEntity } from '@infrastructure/storage/entities/typeorm-schedule.entity';

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
