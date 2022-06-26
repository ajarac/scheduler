import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SCHEDULE_STORAGE_TOKEN } from '@application/out/schedule.storage';
import { CreateScheduleUseCase } from '@application/in/create-schedule.use-case';
import { EditScheduleUseCase } from '@application/in/edit-schedule.use-case';
import { DeleteScheduleUseCase } from '@application/in/delete-schedule.use-case';
import { TypeormScheduleStorage } from '@infrastructure/storage/schedule/typeorm-schedule.storage';
import { ScheduleEntity } from '@infrastructure/storage/entities/typeorm-schedule.entity';
import { GetSchedulesByUserIdUseCase } from '@application/in/get-schedules-by-userid.use-case';

const useCases: Provider[] = [
  CreateScheduleUseCase,
  DeleteScheduleUseCase,
  EditScheduleUseCase,
  GetSchedulesByUserIdUseCase,
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
