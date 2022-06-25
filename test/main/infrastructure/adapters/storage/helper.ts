import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const createTestConfiguration = (
  entities: any[],
): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: ':memory:',
  entities,
  dropSchema: true,
  synchronize: true,
  logging: false,
});
