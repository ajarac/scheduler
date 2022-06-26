import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ScheduleEntity } from '@schedule/infrastructure/storage/typeorm-schedule.entity';
import { TypeormScheduleMapper } from '@schedule/infrastructure/storage/typeorm-schedule.mapper';
import { TypeormScheduleStorage } from '@schedule/infrastructure/storage/typeorm-schedule.storage';
import { IdMother } from '@test/shared/domain/id.mother';
import { createTestConfiguration } from '@test/shared/infrastructure/storage/helper';
import { Repository } from 'typeorm';

import { ScheduleMother } from '../../domain/schedule.mother';

describe('Typeorm Schedule Storage', () => {
  let repository: Repository<ScheduleEntity>;
  let scheduleStorage: TypeormScheduleStorage;

  const REPOSITORY_TOKEN = getRepositoryToken(ScheduleEntity);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTestConfiguration([ScheduleEntity])),
        TypeOrmModule.forFeature([ScheduleEntity]),
      ],
      providers: [TypeormScheduleStorage],
    }).compile();

    scheduleStorage = moduleRef.get(TypeormScheduleStorage);
    repository = moduleRef.get(REPOSITORY_TOKEN);
  });

  describe('getNextId', () => {
    it('should return new id', () => {
      const id = scheduleStorage.getNextId();

      expect(typeof id).toBe('string');
    });
  });

  describe('create', () => {
    it('should throw error if there is any issue saving the schedule', async () => {
      const schedule = ScheduleMother.random();
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.create(schedule)).rejects.toEqual(
        new Error('Error in DB'),
      );
    });

    it('should create an schedule', async () => {
      const schedule = ScheduleMother.random();
      const spySave = jest.spyOn(repository, 'save');

      await scheduleStorage.create(schedule);

      expect(spySave).toBeCalledTimes(1);
      expect(spySave).toBeCalledWith(
        TypeormScheduleMapper.fromDomain(schedule),
      );
    });
  });

  describe('getById', () => {
    it('should throw error if there is any issue getting the schedule', async () => {
      const scheduleId = IdMother.random();
      jest
        .spyOn(repository, 'findOneBy')
        .mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.getById(scheduleId)).rejects.toEqual(
        new Error('Error in DB'),
      );
    });

    it('should return null if there is not any schedule with scheduleId', async () => {
      const scheduleId = IdMother.random();
      const spy = jest.spyOn(repository, 'findOneBy');

      const schedule = await scheduleStorage.getById(scheduleId);

      expect(schedule).toBe(null);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: scheduleId });
    });

    it('should return an schedule with scheduleId', async () => {
      const scheduleExpected = ScheduleMother.random();
      const spy = jest.spyOn(repository, 'findOneBy');
      await repository.save(TypeormScheduleMapper.fromDomain(scheduleExpected));

      const schedule = await scheduleStorage.getById(scheduleExpected.getId());

      expect(schedule).toEqual(scheduleExpected);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: scheduleExpected.getId() });
    });
  });

  describe('search', () => {
    it('should return from userId and range between from date and now', async () => {
      const userId = IdMother.random();
      const schedules = ScheduleMother.randomList(10, userId);
      for (const schedule of schedules) {
        await scheduleStorage.create(schedule);
      }
      const schedulesExpected = await scheduleStorage.search(
        userId,
        ScheduleMother.yearAgo(),
        new Date(),
      );

      expect(schedulesExpected.length).toBe(10);
      expect(schedulesExpected).toEqual(schedules);
    });
  });

  describe('edit', () => {
    it('should throw error if there is any issue editting the schedule', async () => {
      const schedule = ScheduleMother.random();
      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.edit(schedule)).rejects.toEqual(
        new Error('Error in DB'),
      );
    });

    it('should edit the schedule to db', async () => {
      const schedule = ScheduleMother.random();
      const spy = jest.spyOn(repository, 'update');

      await scheduleStorage.edit(schedule);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(
        { id: schedule.getId() },
        TypeormScheduleMapper.fromDomain(schedule),
      );
    });
  });

  describe('delete', () => {
    it('should throw error if there is any issue deleting the schedule', async () => {
      const scheduleId = IdMother.random();
      jest
        .spyOn(repository, 'delete')
        .mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.delete(scheduleId)).rejects.toEqual(
        new Error('Error in DB'),
      );
    });

    it('should delete schedule', async () => {
      const schedule = ScheduleMother.random();
      await scheduleStorage.create(schedule);
      const spy = jest.spyOn(repository, 'delete');

      await scheduleStorage.delete(schedule.getId());
      const scheduleExpected = await scheduleStorage.getById(schedule.getId());

      expect(scheduleExpected).toBeNull();
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: schedule.getId() });
    });
  });
});
