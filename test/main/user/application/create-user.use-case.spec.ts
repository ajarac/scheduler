import { IdMother } from '@test/shared/domain/id.mother';
import {
  CreateUserDTO,
  CreateUserUseCase,
} from '@user/application/create-user.use-case';
import { User } from '@user/domain/user';
import { UserStorage } from '@user/domain/user.storage';

import { DummyHashProvider } from '../domain/dummy-hash.provider';
import { DummyUserStorage } from '../domain/dummy-user.storage';
import { UserMother } from '../domain/user.mother';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if creating ocurr any error', async () => {
    const createUserDTO: CreateUserDTO = CreateUserDTOMother();
    jest
      .spyOn(DummyUserStorage.prototype, 'create')
      .mockRejectedValue(new Error('error in storage'));

    await expect(createUserUseCase.execute(createUserDTO)).rejects.toEqual(
      new Error('error in storage'),
    );
  });

  it('should create user', async () => {
    const createUserDTO: CreateUserDTO = CreateUserDTOMother();
    const userId = IdMother.random();
    const spyCreate = jest
      .spyOn(DummyUserStorage.prototype, 'create')
      .mockResolvedValue(null);
    const spyGetNextId = jest
      .spyOn(DummyUserStorage.prototype, 'getNextId')
      .mockImplementation(() => userId);
    const expectedToCall = new User(
      userId,
      createUserDTO.username,
      dummyHashProvider.hash(createUserDTO.password),
      createUserDTO.role,
    );

    await createUserUseCase.execute(createUserDTO);

    expect(spyCreate).toBeCalledTimes(1);
    expect(spyCreate).toBeCalledWith(expectedToCall);
    expect(spyGetNextId).toBeCalledTimes(1);
  });
});

function CreateUserDTOMother(): CreateUserDTO {
  return {
    username: UserMother.userName(),
    password: UserMother.password(),
    role: UserMother.role(),
  };
}
