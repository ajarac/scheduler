import { DummyScheduleStorage } from '@test/application/out/dummy-schedule.storage';
import { IdMother } from '@test/domain/id.mother';
import { CreateScheduleDTO, CreateScheduleUseCase } from '@application/in/create-schedule.use-case';
import { ScheduleMother } from '@test/domain/schedule/schedule.mother';
import { Schedule } from '@domain/schedule/schedule';
import { ScheduleStorage } from '@application/out/schedule.storage';
import { UserMother } from '@test/domain/user/user.mother';

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
    jest.spyOn(DummyScheduleStorage.prototype, 'getNextId').mockImplementation(() => scheduleId);
    const expectedToCall = new Schedule(scheduleId, createScheduleDTO.userId, createScheduleDTO.workDate, createScheduleDTO.shiftHours);

    await createScheduleUseCase.execute(createScheduleDTO);

    expect(spySchedule).toBeCalledTimes(1);
    expect(spySchedule).toBeCalledWith(expectedToCall);
  });
});

function CreateScheduleDTOMother(userId: string): CreateScheduleDTO {
  return {
    userId,
    workDate: ScheduleMother.workDate(),
    shiftHours: ScheduleMother.shiftHours()
  };
}
