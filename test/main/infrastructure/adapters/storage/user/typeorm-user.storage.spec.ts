import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { IdMother } from '@test/domain/id.mother';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { TypeormUser } from '@infrastructure/adapters/storage/user/typeorm-user.entity';
import { TypeormUserMapper } from '@infrastructure/adapters/storage/user/typeorm-user.mapper';
import { TypeormUserStorage } from '@infrastructure/adapters/storage/user/typeorm-user.storage';
import { UserMother } from '@test/domain/user.mother';
import { createTestConfiguration } from '../helper';

describe('Typeorm User Storage', () => {
  let repository: Repository<TypeormUser>;
  let userStorage: TypeormUserStorage;

  const REPOSITORY_TOKEN = getRepositoryToken(TypeormUser);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTestConfiguration([TypeormUser])),
        TypeOrmModule.forFeature([TypeormUser]),
      ],
      providers: [TypeormUserStorage],
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
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Error in DB'));

      await expect(userStorage.create(user)).rejects.toEqual(
        new Error('Error in DB'),
      );
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
      jest
        .spyOn(repository, 'findOneBy')
        .mockRejectedValue(new Error('Error in DB'));

      await expect(userStorage.getById(userId)).rejects.toEqual(
        new Error('Error in DB'),
      );
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

    describe('edit', () => {
      it('should throw error if there is any issue editting the user', async () => {
        const user = UserMother.random();
        jest
          .spyOn(repository, 'update')
          .mockRejectedValue(new Error('Error in DB'));

        await expect(userStorage.edit(user)).rejects.toEqual(
          new Error('Error in DB'),
        );
      });

      it('should edit the user to db', async () => {
        const user = UserMother.random();
        const spy = jest.spyOn(repository, 'update');

        await userStorage.edit(user);

        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(
          { id: user.getId() },
          TypeormUserMapper.fromDomain(user),
        );
      });
    });

    describe('delete', () => {
      it('should throw error if there is any issue deleting the user', async () => {
        const userId = IdMother.random();
        jest
          .spyOn(repository, 'delete')
          .mockRejectedValue(new Error('Error in DB'));

        await expect(userStorage.delete(userId)).rejects.toEqual(
          new Error('Error in DB'),
        );
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
  });
});
