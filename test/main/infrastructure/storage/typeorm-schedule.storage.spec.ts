import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { createTestConfiguration } from './helper';
import { EntityManager, Repository } from 'typeorm';
import { IdMother } from '@test/domain/id.mother';
import { ScheduleMother } from '@test/domain/schedule/schedule.mother';
import { TypeormScheduleStorage } from '@infrastructure/storage/schedule/typeorm-schedule.storage';
import { ScheduleEntity } from '@infrastructure/storage/entities/typeorm-schedule.entity';
import { TypeormScheduleMapper } from '@infrastructure/storage/schedule/typeorm-schedule.mapper';
import { UserEntity } from '@infrastructure/storage/entities/typeorm-user.entity';
import { UserMother } from '@test/domain/user/user.mother';
import { TypeormUserMapper } from '@infrastructure/storage/user/typeorm-user.mapper';

describe('Typeorm Schedule Storage', () => {
  let repository: Repository<ScheduleEntity>;
  let scheduleStorage: TypeormScheduleStorage;
  let manager: EntityManager;

  const REPOSITORY_TOKEN = getRepositoryToken(ScheduleEntity);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTestConfiguration([ScheduleEntity, UserEntity])),
        TypeOrmModule.forFeature([ScheduleEntity, UserEntity])
      ],
      providers: [TypeormScheduleStorage]
    }).compile();

    scheduleStorage = moduleRef.get(TypeormScheduleStorage);
    repository = moduleRef.get(REPOSITORY_TOKEN);
    manager = moduleRef.get(EntityManager);
  });

  describe('getNextId', () => {
    it('should return new id', () => {
      const id = scheduleStorage.getNextId();

      expect(typeof id).toBe('string');
    });
  });

  async function saveUser() {
    const user = UserMother.random();
    const userEntity = TypeormUserMapper.fromDomain(user);
    await manager.save(userEntity);
    return user;
  }

  describe('create', () => {
    it('should throw error if there is any issue saving the schedule', async () => {
      const schedule = ScheduleMother.random();
      jest.spyOn(repository, 'save').mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.create(schedule)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should create an schedule', async () => {
      const user = await saveUser();
      const schedule = ScheduleMother.random(user.getId());
      const spySave = jest.spyOn(repository, 'save');

      await scheduleStorage.create(schedule);

      expect(spySave).toBeCalledTimes(1);
      expect(spySave).toBeCalledWith(TypeormScheduleMapper.fromDomain(schedule));
    });
  });

  describe('getById', () => {
    it('should throw error if there is any issue getting the schedule', async () => {
      const scheduleId = IdMother.random();
      jest.spyOn(repository, 'findOne').mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.getById(scheduleId)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should return null if there is not any schedule with scheduleId', async () => {
      const scheduleId = IdMother.random();
      const spy = jest.spyOn(repository, 'findOne');

      const schedule = await scheduleStorage.getById(scheduleId);

      expect(schedule).toBe(null);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ relations: { user: true }, where: { id: scheduleId } });
    });

    it('should return an schedule with scheduleId', async () => {
      const user = await saveUser();
      const scheduleExpected = ScheduleMother.random(user.getId());
      const spy = jest.spyOn(repository, 'findOne');
      await repository.save(TypeormScheduleMapper.fromDomain(scheduleExpected));

      const schedule = await scheduleStorage.getById(scheduleExpected.getId());

      expect(schedule).toEqual(scheduleExpected);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ relations: { user: true }, where: { id: schedule.getId() } });
    });
  });

  describe('search', () => {
    it('should return empty schedules if there is not any with userId and range between', async () => {
      const userId = IdMother.random();

      const schedulesExpected = await scheduleStorage.search(userId, ScheduleMother.yearAgo(), new Date());

      expect(schedulesExpected.length).toBe(0);
    });

    it('should return schedules from userId and range between from date and now', async () => {
      const user = await saveUser();
      const schedules = ScheduleMother.randomList(10, user.getId());
      for (const schedule of schedules) {
        await scheduleStorage.create(schedule);
      }
      const schedulesExpected = await scheduleStorage.search(user.getId(), ScheduleMother.yearAgo(), new Date());

      expect(schedulesExpected.length).toBe(10);
      expect(schedulesExpected).toEqual(schedules);
    });
  });

  describe('edit', () => {
    it('should throw error if there is any issue editting the schedule', async () => {
      const schedule = ScheduleMother.random();
      jest.spyOn(repository, 'update').mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.edit(schedule)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should edit the schedule to db', async () => {
      const user = await saveUser();
      const schedule = ScheduleMother.random(user.getId());
      const spy = jest.spyOn(repository, 'update');

      await scheduleStorage.edit(schedule);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: schedule.getId() }, TypeormScheduleMapper.fromDomain(schedule));
    });
  });

  describe('delete', () => {
    it('should throw error if there is any issue deleting the schedule', async () => {
      const scheduleId = IdMother.random();
      jest.spyOn(repository, 'delete').mockRejectedValue(new Error('Error in DB'));

      await expect(scheduleStorage.delete(scheduleId)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should delete schedule', async () => {
      const user = await saveUser();
      const schedule = ScheduleMother.random(user.getId());
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
