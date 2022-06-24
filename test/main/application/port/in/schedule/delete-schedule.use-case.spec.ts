import { DeleteScheduleUseCase } from '@application/port/in/schedule/delete-schedule.use-case';
import { DummyScheduleStorage } from '../../out/dummy-schedule.storage';
import { IdMother } from '@test/domain/id.mother';
import { ScheduleStorage } from '@application/port/out/schedule.storage';

describe('Delete Schedule Use Case', () => {
  let scheduleStorage: ScheduleStorage;
  let deleteScheduleUseCase: DeleteScheduleUseCase;

  beforeEach(() => {
    scheduleStorage = new DummyScheduleStorage();
    deleteScheduleUseCase = new DeleteScheduleUseCase(scheduleStorage);
  });

  it('should delete schedule by schedule id', () => {
    const spy = jest.spyOn(DummyScheduleStorage.prototype, 'delete');
    const scheduleId = IdMother.random();

    deleteScheduleUseCase.execute(scheduleId);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(scheduleId);
  });
});
