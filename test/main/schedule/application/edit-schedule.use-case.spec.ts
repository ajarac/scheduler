import {
  EditScheduleDTO,
  EditScheduleUseCase,
} from '@schedule/application/edit-schedule.use-case';
import { ScheduleNotFound } from '@schedule/domain/schedule-not-found';
import { ScheduleStorage } from '@schedule/domain/schedule.storage';
import { ScheduleMother } from '@test/schedule/domain/schedule.mother';
import { IdMother } from '@test/shared/domain/id.mother';

import { DummyScheduleStorage } from '../domain/dummy-schedule.storage';

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

  it('should throw error if editing ocurr any error', async () => {
    const schedule = ScheduleMother.random();
    const editScheduleDTO = EditScheduleDTOMother();
    jest
      .spyOn(DummyScheduleStorage.prototype, 'getById')
      .mockResolvedValue(schedule);

    jest
      .spyOn(DummyScheduleStorage.prototype, 'edit')
      .mockRejectedValue(new Error('error in storage'));

    await expect(
      editScheduleUseCase.execute(schedule.getId(), editScheduleDTO),
    ).rejects.toEqual(new Error('error in storage'));
  });

  it('should throw error if schedule does not exist', async () => {
    const scheduleId = IdMother.random();
    jest
      .spyOn(DummyScheduleStorage.prototype, 'getById')
      .mockResolvedValue(null);
    const editScheduleDTO = EditScheduleDTOMother();

    await expect(
      editScheduleUseCase.execute(scheduleId, editScheduleDTO),
    ).rejects.toEqual(new ScheduleNotFound(scheduleId));
  });

  it('should edit schedule and save it', async () => {
    const schedule = ScheduleMother.random();
    const editScheduleDTO = EditScheduleDTOMother();
    const spyGetById = jest
      .spyOn(DummyScheduleStorage.prototype, 'getById')
      .mockResolvedValue(schedule);

    const spyEdit = jest
      .spyOn(DummyScheduleStorage.prototype, 'edit')
      .mockResolvedValue(null);

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
