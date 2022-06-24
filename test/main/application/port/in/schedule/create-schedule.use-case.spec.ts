import {
  CreateScheduleDTO,
  CreateScheduleUseCase,
} from '@application/port/in/schedule/create-schedule.use-case';

import { DummyScheduleStorage } from '../../out/dummy-schedule.storage';
import { DummyUserStorage } from '../../out/dummy-user.storage';
import { IdMother } from '@test/domain/id.mother';
import { Schedule } from '@domain/schedule/schedule';
import { ScheduleMother } from '@test/domain/schedule.mother';
import { ScheduleStorage } from '@application/port/out/schedule.storage';
import { UserMother } from '@test/domain/user.mother';
import { UserNotFound } from '@domain/user/user-not-found';
import { UserStorage } from '@application/port/out/user.storage';

describe('Create Schedule Use Case', () => {
  let userStorage: UserStorage;
  let scheduleStorage: ScheduleStorage;
  let createScheduleUseCase: CreateScheduleUseCase;

  beforeEach(() => {
    userStorage = new DummyUserStorage();
    scheduleStorage = new DummyScheduleStorage();
    createScheduleUseCase = new CreateScheduleUseCase(
      userStorage,
      scheduleStorage,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if user does not exist', async () => {
    const userId = IdMother.random();
    const createScheduleDTO = CreateScheduleDTOMother(userId);
    jest.spyOn(DummyUserStorage.prototype, 'getById').mockResolvedValue(null);

    await expect(
      createScheduleUseCase.execute(createScheduleDTO),
    ).rejects.toEqual(new UserNotFound(userId));
  });

  it('should create schedule', async () => {
    const user = UserMother.random();
    const scheduleId = IdMother.random();
    const createScheduleDTO = CreateScheduleDTOMother(user.getId());
    const spyUser = jest
      .spyOn(DummyUserStorage.prototype, 'getById')
      .mockResolvedValue(user);

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

    expect(spyUser).toBeCalledTimes(1);
    expect(spyUser).toBeCalledWith(user.getId());
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
