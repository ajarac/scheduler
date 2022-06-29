import { ScheduleStorage } from '@application/out/schedule.storage';
import { GetSchedulesByUserIdUseCase } from '@application/in/get-schedules-by-userid.use-case';
import { DummyScheduleStorage } from '@test/application/out/dummy-schedule.storage';
import { IdMother } from '@test/domain/id.mother';
import { DateTime } from 'luxon';
import { ScheduleMother } from '@test/domain/schedule/schedule.mother';
import { scheduleDomainToDTO } from '@application/dto/schedule.dto';

describe('Get Schedules By UserId Use Case', () => {
  let scheduleStorage: ScheduleStorage;
  let getSchedulesByUserIdUseCase: GetSchedulesByUserIdUseCase;

  beforeEach(() => {
    scheduleStorage = new DummyScheduleStorage();
    getSchedulesByUserIdUseCase = new GetSchedulesByUserIdUseCase(scheduleStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if getting schedules ocurr any error', async () => {
    const userId = IdMother.random();

    jest.spyOn(DummyScheduleStorage.prototype, 'search').mockRejectedValue(new Error('error in storage'));

    await expect(getSchedulesByUserIdUseCase.execute(userId, new Date(), new Date())).rejects.toEqual(new Error('error in storage'));
  });

  it('should return empty list if there is not user', async () => {
    const userId = IdMother.random();
    const from = DateTime.now().minus({ day: 1 }).toJSDate();
    const to = new Date();
    const spy = jest.spyOn(DummyScheduleStorage.prototype, 'search').mockResolvedValue([]);

    const schedules = await getSchedulesByUserIdUseCase.execute(userId, from, to);

    expect(schedules.length).toBe(0);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(userId, from, to);
  });

  it('should return empty list if there is not user', async () => {
    const userId = IdMother.random();
    const from = DateTime.now().minus({ day: 1 }).toJSDate();
    const to = new Date();
    const size = 10;
    const schedulesRandom = ScheduleMother.randomList(size, userId);
    const schedulesExpected = schedulesRandom.map(scheduleDomainToDTO);
    const spy = jest.spyOn(DummyScheduleStorage.prototype, 'search').mockResolvedValue(schedulesRandom);

    const schedules = await getSchedulesByUserIdUseCase.execute(userId, from, to);

    expect(schedules.length).toBe(size);
    expect(schedules).toEqual(schedulesExpected);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(userId, from, to);
  });
});
