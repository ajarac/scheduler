import { IdMother } from '@test/domain/id.mother';
import { User } from '@domain/user/user';
import {
  CreateUserDTO,
  CreateUserUseCase,
} from '@application/in/create-user.use-case';
import { DummyUserStorage } from '@test/application/out/dummy-user.storage';
import { UserStorage } from '@application/out/user.storage';
import { UserMother } from '@test/domain/user/user.mother';
import { DummyHashProvider } from '@test/application/out/dummy-hash.provider';

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
