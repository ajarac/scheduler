import {
  EditUserDTO,
  EditUserUseCase,
} from '@application/port/in/edit-user.use-case';

import { DummyHashProvider } from '../out/dummy-hash.provider';
import { DummyUserStorage } from '../out/dummy-user.storage';
import { HashProvider } from '@application/port/out/hash.provider';
import { IdMother } from '@test/domain/id.mother';
import { UserMother } from '@test/domain/user.mother';
import { UserNotFound } from '@domain/user/user-not-found';
import { UserStorage } from '@application/port/out/user.storage';

describe('Edit User Use Case', () => {
  let editUserUseCase: EditUserUseCase;
  let userStorage: UserStorage;
  let hashProvider: HashProvider;

  beforeEach(() => {
    userStorage = new DummyUserStorage();
    hashProvider = new DummyHashProvider();
    editUserUseCase = new EditUserUseCase(userStorage, hashProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw user not found if there is not user with userId', async () => {
    const userId = IdMother.random();
    jest
      .spyOn(DummyUserStorage.prototype, 'getById')
      .mockImplementation(() => Promise.resolve(null));
    const editUserDTO = EditUserDTOMother();

    try {
      await editUserUseCase.execute(userId, editUserDTO);
    } catch (error: any) {
      expect(error instanceof UserNotFound).toBeTruthy();
      expect(error.message).toBe(`User not found with id: ${userId}`);
    }
  });

  it('should update user', async () => {
    const user = UserMother.random();
    const editUser = EditUserDTOMother();
    const spyHash = jest.spyOn(DummyHashProvider.prototype, 'hash');
    const spyGetById = jest
      .spyOn(DummyUserStorage.prototype, 'getById')
      .mockImplementation(() => Promise.resolve(user));
    const spyEdit = jest.spyOn(DummyUserStorage.prototype, 'edit');

    await editUserUseCase.execute(user.getId(), editUser);

    expect(spyGetById).toBeCalledTimes(1);
    expect(spyGetById).toBeCalledWith(user.getId());
    expect(spyHash).toBeCalledTimes(1);
    expect(spyHash).toBeCalledWith(editUser.password);
    expect(spyEdit).toBeCalledTimes(1);
    expect(spyEdit).toBeCalledWith({
      id: user.getId(),
      password: hashProvider.hash(editUser.password),
      username: editUser.username,
      role: editUser.role,
    });
  });
});

function EditUserDTOMother(): EditUserDTO {
  return {
    username: UserMother.userName(),
    password: UserMother.password(),
    role: UserMother.role(),
  };
}
