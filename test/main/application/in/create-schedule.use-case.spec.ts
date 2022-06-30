import { DummyScheduleStorage } from '@test/application/out/dummy-schedule.storage';
import { IdMother } from '@test/domain/id.mother';
import { CreateScheduleUseCase } from '@application/in/create-schedule.use-case';
import { ScheduleMother } from '@test/domain/schedule/schedule.mother';
import { Schedule } from '@domain/schedule/schedule';
import { ScheduleStorage } from '@application/out/schedule.storage';
import { UserMother } from '@test/domain/user/user.mother';
import { SchedulesAlreadyExists } from '@domain/schedule/schedules-already-exists';

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

  it('should not create schedule if there is any schedule with the same work date', async () => {
    const user = UserMother.random();
    const schedule = ScheduleMother.random(user.getId());
    jest.spyOn(DummyScheduleStorage.prototype, 'search').mockResolvedValue([schedule]);

    await expect(createScheduleUseCase.execute(schedule.getUserId(), schedule.getWorkDate(), schedule.getShiftHours())).rejects.toEqual(
      new SchedulesAlreadyExists()
    );
  });

  it('should create schedule if there is not any schedule with the same work date', async () => {
    const user = UserMother.random();
    const scheduleId = IdMother.random();
    const schedule = ScheduleMother.random(user.getId());
    jest.spyOn(DummyScheduleStorage.prototype, 'search').mockResolvedValue([]);
    const spySchedule = jest.spyOn(DummyScheduleStorage.prototype, 'create');
    jest.spyOn(DummyScheduleStorage.prototype, 'getNextId').mockImplementation(() => scheduleId);
    const expectedToCall = new Schedule(scheduleId, schedule.getUserId(), schedule.getWorkDate(), schedule.getShiftHours());

    await createScheduleUseCase.execute(schedule.getUserId(), schedule.getWorkDate(), schedule.getShiftHours());

    expect(spySchedule).toBeCalledTimes(1);
    expect(spySchedule).toBeCalledWith(expectedToCall);
  });
});
