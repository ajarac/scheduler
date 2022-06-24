import {
  EditScheduleDTO,
  EditScheduleUseCase,
} from '@application/port/in/edit-schedule.use-case';

import { DummyScheduleStorage } from '../out/dummy-schedule.storage';
import { IdMother } from '@test/domain/id.mother';
import { ScheduleMother } from '@test/domain/schedule.mother';
import { ScheduleNotFound } from '@domain/schedule/schedule-not-found';
import { ScheduleStorage } from '@application/port/out/schedule.storage';

describe('Edit Schedule Use Case', () => {
  let scheduleStorage: ScheduleStorage;
  let editScheduleUseCase: EditScheduleUseCase;

  beforeAll(() => {
    scheduleStorage = new DummyScheduleStorage();
    editScheduleUseCase = new EditScheduleUseCase(scheduleStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if schedule does not exist', async () => {
    const scheduleId = IdMother.random();
    jest
      .spyOn(DummyScheduleStorage.prototype, 'getById')
      .mockImplementation(() => Promise.resolve(null));
    const editScheduleDTO = EditScheduleDTOMother();

    try {
      await editScheduleUseCase.execute(scheduleId, editScheduleDTO);
    } catch (error: any) {
      expect(error instanceof ScheduleNotFound).toBeTruthy();
      expect(error.message).toBe(`Schedule not found with id: ${scheduleId}`);
    }
  });

  it('should edit schedule and save it', async () => {
    const schedule = ScheduleMother.random();
    const editScheduleDTO = EditScheduleDTOMother();
    const spyGetById = jest
      .spyOn(DummyScheduleStorage.prototype, 'getById')
      .mockImplementation(() => Promise.resolve(schedule));
    const spyEdit = jest.spyOn(DummyScheduleStorage.prototype, 'edit');

    await editScheduleUseCase.execute(schedule.getId(), editScheduleDTO);

    expect(spyGetById).toBeCalledTimes(1);
    expect(spyGetById).toBeCalledWith(schedule.getId());
    expect(spyEdit).toBeCalledTimes(1);
    expect(spyEdit).toBeCalledWith({
      id: schedule.getId(),
      userId: schedule.getUserId(),
      ...editScheduleDTO,
    });
  });
});

function EditScheduleDTOMother(): EditScheduleDTO {
  return {
    workDate: ScheduleMother.workDate(),
    shiftHours: ScheduleMother.shiftHours(),
  };
}
