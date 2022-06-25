import {
  CreateScheduleDTO,
  CreateScheduleUseCase,
} from '@schedule/application/create-schedule.use-case';
import { Schedule } from '@schedule/domain/schedule';
import { ScheduleStorage } from '@schedule/domain/schedule.storage';
import { ScheduleMother } from '@test/schedule/domain/schedule.mother';
import { IdMother } from '@test/shared/domain/id.mother';
import { UserMother } from '@test/user/domain/user.mother';

import { DummyScheduleStorage } from '../domain/dummy-schedule.storage';

describe('Create Schedule Use Case', () => {
  let scheduleStorage: ScheduleStorage;
  let createScheduleUseCase: CreateScheduleUseCase;

  beforeEach(() => {
    scheduleStorage = new DummyScheduleStorage();
    createScheduleUseCase = new CreateScheduleUseCase(scheduleStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create schedule', async () => {
    const user = UserMother.random();
    const scheduleId = IdMother.random();
    const createScheduleDTO = CreateScheduleDTOMother(user.getId());

    const spySchedule = jest.spyOn(DummyScheduleStorage.prototype, 'create');
    jest
      .spyOn(DummyScheduleStorage.prototype, 'getNextId')
      .mockImplementation(() => scheduleId);
    const expectedToCall = new Schedule(
      scheduleId,
      createScheduleDTO.userId,
      createScheduleDTO.workDate,
      createScheduleDTO.shiftHours,
    );

    await createScheduleUseCase.execute(createScheduleDTO);

    expect(spySchedule).toBeCalledTimes(1);
    expect(spySchedule).toBeCalledWith(expectedToCall);
  });
});

function CreateScheduleDTOMother(userId: string): CreateScheduleDTO {
  return {
    userId,
    workDate: ScheduleMother.workDate(),
    shiftHours: ScheduleMother.shiftHours(),
  };
}
