import { ScheduleStorage } from '@schedule/domain/schedule.storage';

import { ScheduleDTO, domainToDTO } from './dto/schedule.dto';

export class GetSchedulesByUserIdUseCase {
  constructor(private readonly storage: ScheduleStorage) {}

  async execute(userId: string, from: Date, to: Date): Promise<ScheduleDTO[]> {
    const schedules = await this.storage.search(userId, from, to);
    return schedules.map(domainToDTO);
  }
}
