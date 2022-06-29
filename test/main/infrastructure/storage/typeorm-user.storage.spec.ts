import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { createTestConfiguration } from './helper';
import { Repository } from 'typeorm';
import { IdMother } from '@test/domain/id.mother';
import { UserMother } from '@test/domain/user/user.mother';
import { TypeormUserMapper } from '@infrastructure/storage/user/typeorm-user.mapper';
import { TypeormUserStorage } from '@infrastructure/storage/user/typeorm-user.storage';
import { UserEntity } from '@infrastructure/storage/entities/typeorm-user.entity';
import { ScheduleEntity } from '@infrastructure/storage/entities/typeorm-schedule.entity';
import { Order } from '@shared/short';
import { DateTime } from 'luxon';
import { ScheduleMother } from '@test/domain/schedule/schedule.mother';
import { TypeormScheduleMapper } from '@infrastructure/storage/schedule/typeorm-schedule.mapper';

describe('Typeorm User Storage', () => {
  let repository: Repository<UserEntity>;
  let userStorage: TypeormUserStorage;

  const REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(createTestConfiguration([ScheduleEntity, UserEntity])), TypeOrmModule.forFeature([UserEntity])],
      providers: [TypeormUserStorage]
    }).compile();
    userStorage = moduleRef.get(TypeormUserStorage);
    repository = moduleRef.get(REPOSITORY_TOKEN);
  });

  describe('getNextId', () => {
    it('should return new id', () => {
      const id = userStorage.getNextId();

      expect(typeof id).toBe('string');
    });
  });

  describe('create', () => {
    it('should throw error if there is any issue saving the user', async () => {
      const user = UserMother.random();
      jest.spyOn(repository, 'save').mockRejectedValue(new Error('Error in DB'));

      await expect(userStorage.create(user)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should create an user', async () => {
      const user = UserMother.random();
      const spySave = jest.spyOn(repository, 'save');

      await userStorage.create(user);

      expect(spySave).toBeCalledTimes(1);
      expect(spySave).toBeCalledWith(TypeormUserMapper.fromDomain(user));
    });
  });

  describe('getById', () => {
    it('should throw error if there is any issue getting the user', async () => {
      const userId = IdMother.random();
      jest.spyOn(repository, 'findOneBy').mockRejectedValue(new Error('Error in DB'));

      await expect(userStorage.getById(userId)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should return null if there is not any user with userId', async () => {
      const userId = IdMother.random();
      const spy = jest.spyOn(repository, 'findOneBy');

      const user = await userStorage.getById(userId);

      expect(user).toBe(null);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: userId });
    });

    it('should return an user with userId', async () => {
      const userExpected = UserMother.random();
      const spy = jest.spyOn(repository, 'findOneBy');
      await repository.save(TypeormUserMapper.fromDomain(userExpected));

      const user = await userStorage.getById(userExpected.getId());

      expect(user).toEqual(userExpected);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: userExpected.getId() });
    });
  });

  describe('edit', () => {
    it('should throw error if there is any issue editting the user', async () => {
      const user = UserMother.random();
      jest.spyOn(repository, 'update').mockRejectedValue(new Error('Error in DB'));

      await expect(userStorage.edit(user)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should edit the user to db', async () => {
      const user = UserMother.random();
      const spy = jest.spyOn(repository, 'update');

      await userStorage.edit(user);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: user.getId() }, TypeormUserMapper.fromDomain(user));
    });
  });

  describe('delete', () => {
    it('should throw error if there is any issue deleting the user', async () => {
      const userId = IdMother.random();
      jest.spyOn(repository, 'delete').mockRejectedValue(new Error('Error in DB'));

      await expect(userStorage.delete(userId)).rejects.toEqual(new Error('Error in DB'));
    });

    it('should delete user', async () => {
      const user = UserMother.random();
      await userStorage.create(user);
      const spy = jest.spyOn(repository, 'delete');

      await userStorage.delete(user.getId());
      const userExpected = await userStorage.getById(user.getId());

      expect(userExpected).toBeNull();
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ id: user.getId() });
    });
  });

  describe('getTopUsers', () => {
    it('should return empty list if there is not any match', async () => {
      const from = DateTime.now().minus({ day: 1 }).toJSDate();
      const to = new Date();

      const topUsers = await userStorage.getTopUsers(Order.ASC, from, to);

      expect(topUsers.length).toBe(0);
    });

    it('should return the top users order ASC', async () => {
      const user1 = TypeormUserMapper.fromDomain(UserMother.random());
      const user2 = TypeormUserMapper.fromDomain(UserMother.random());
      const schedules1 = ScheduleMother.randomList(10, user1.id).map(TypeormScheduleMapper.fromDomain);
      const schedules2 = ScheduleMother.randomList(10, user2.id).map(TypeormScheduleMapper.fromDomain);
      await repository.manager.save([user1, user2]);
      await repository.manager.save([...schedules1, ...schedules2]);
      const from = DateTime.now().minus({ years: 1 }).toJSDate();
      const to = new Date();

      const topUsers = await userStorage.getTopUsers(Order.ASC, from, to);

      expect(topUsers.length).toBe(2);
      expect(topUsers[0].totalHours <= topUsers[1].totalHours).toBe(true);
    });

    it('should return the top users order DESC', async () => {
      const user1 = TypeormUserMapper.fromDomain(UserMother.random());
      const user2 = TypeormUserMapper.fromDomain(UserMother.random());
      const schedules1 = ScheduleMother.randomList(10, user1.id).map(TypeormScheduleMapper.fromDomain);
      const schedules2 = ScheduleMother.randomList(10, user2.id).map(TypeormScheduleMapper.fromDomain);
      await repository.manager.save([user1, user2]);
      await repository.manager.save([...schedules1, ...schedules2]);
      const from = DateTime.now().minus({ years: 1 }).toJSDate();
      const to = new Date();

      const topUsers = await userStorage.getTopUsers(Order.DESC, from, to);

      expect(topUsers.length).toBe(2);
      expect(topUsers[0].totalHours >= topUsers[1].totalHours).toBe(true);
    });
  });
});
