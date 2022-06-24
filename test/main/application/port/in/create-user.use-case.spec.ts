import {
  CreateUserDTO,
  CreateUserUseCase,
} from '@application/port/in/create-user.use-case';

import { DummyHashProvider } from '../out/dummy-hash.provider';
import { DummyUserStorage } from '@test/application/port/out/dummy-user.storage';
import { IdMother } from '@test/domain/id.mother';
import { User } from '@domain/user/user';
import { UserRole } from '@domain/user/user-role';
import { UserStorage } from '@application/port/out/user.storage';
import { faker } from '@faker-js/faker';

describe('Create User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let dummyUserStorage: UserStorage;
  let dummyHashProvider: DummyHashProvider;
  beforeEach(() => {
    dummyUserStorage = new DummyUserStorage();
    dummyHashProvider = new DummyHashProvider();
    createUserUseCase = new CreateUserUseCase(
      dummyUserStorage,
      dummyHashProvider,
    );
  });

  it('should create user', () => {
    const createUserDTO: CreateUserDTO = CreateUserDTOMother();
    const userId = IdMother.random();
    const spyCreate = jest.spyOn(DummyUserStorage.prototype, 'create');
    const spyGetNextId = jest
      .spyOn(DummyUserStorage.prototype, 'getNextId')
      .mockImplementation(() => userId);
    const expectedToCall = new User(
      userId,
      createUserDTO.username,
      dummyHashProvider.hash(createUserDTO.password),
      createUserDTO.role,
    );

    createUserUseCase.execute(createUserDTO);

    expect(spyCreate).toBeCalledTimes(1);
    expect(spyCreate).toBeCalledWith(expectedToCall);
    expect(spyGetNextId).toBeCalledTimes(1);
  });
});

function CreateUserDTOMother(): CreateUserDTO {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement([UserRole.ADMIN, UserRole.STAFF]),
  };
}
