import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateScheduleUseCase } from './application/create-schedule.use-case';
import { DeleteScheduleUseCase } from './application/delete-schedule.use-case';
import { EditScheduleUseCase } from './application/edit-schedule.use-case';
import { SCHEDULE_STORAGE_TOKEN } from './domain/schedule.storage';
import { ScheduleEntity } from './infrastructure/storage/typeorm-schedule.entity';
import { TypeormScheduleStorage } from './infrastructure/storage/typeorm-schedule.storage';

const useCases: Provider[] = [
  CreateScheduleUseCase,
  DeleteScheduleUseCase,
  EditScheduleUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
  providers: [
    {
      provide: SCHEDULE_STORAGE_TOKEN,
      useClass: TypeormScheduleStorage,
    },
    ...useCases,
  ],
  exports: useCases,
})
export class ScheduleModule {}
