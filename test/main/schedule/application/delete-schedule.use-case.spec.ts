import { DeleteScheduleUseCase } from '@schedule/application/delete-schedule.use-case';
import { ScheduleStorage } from '@schedule/domain/schedule.storage';
import { IdMother } from '@test/shared/domain/id.mother';

import { DummyScheduleStorage } from '../domain/dummy-schedule.storage';

describe('Delete Schedule Use Case', () => {
  let scheduleStorage: ScheduleStorage;
  let deleteScheduleUseCase: DeleteScheduleUseCase;

  beforeEach(() => {
    scheduleStorage = new DummyScheduleStorage();
    deleteScheduleUseCase = new DeleteScheduleUseCase(scheduleStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if deleting ocurr any error', async () => {
    const scheduleId = IdMother.random();
    jest
      .spyOn(DummyScheduleStorage.prototype, 'delete')
      .mockRejectedValue(new Error('error in storage'));

    await expect(deleteScheduleUseCase.execute(scheduleId)).rejects.toEqual(
      new Error('error in storage'),
    );
  });

  it('should delete schedule by schedule id', async () => {
    const spy = jest
      .spyOn(DummyScheduleStorage.prototype, 'delete')
      .mockResolvedValue(null);
    const scheduleId = IdMother.random();

    await deleteScheduleUseCase.execute(scheduleId);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(scheduleId);
  });
});
