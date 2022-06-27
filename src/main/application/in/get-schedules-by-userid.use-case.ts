import { Inject, Injectable } from '@nestjs/common';
import { SCHEDULE_STORAGE_TOKEN, ScheduleStorage } from '../out/schedule.storage';

import { scheduleDomainToDTO, ScheduleDTO } from '../dto/schedule.dto';

@Injectable()
export class GetSchedulesByUserIdUseCase {
  constructor(@Inject(SCHEDULE_STORAGE_TOKEN) private readonly storage: ScheduleStorage) {}

  async execute(userId: string, from: Date, to: Date): Promise<ScheduleDTO[]> {
    const schedules = await this.storage.search(userId, from, to);
    return schedules.map(scheduleDomainToDTO);
  }
}
