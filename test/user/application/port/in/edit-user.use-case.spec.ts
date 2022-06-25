import { IdMother } from '@test/shared/domain/id.mother';
import { UserMother } from '@test/user/domain/user.mother';
import {
  EditUserDTO,
  EditUserUseCase,
} from '@user/application/port/in/edit-user.use-case';
import { HashProvider } from '@user/application/port/out/hash.provider';
import { UserStorage } from '@user/application/port/out/user.storage';
import { UserNotFound } from '@user/domain/user-not-found';

import { DummyHashProvider } from '../out/dummy-hash.provider';
import { DummyUserStorage } from '../out/dummy-user.storage';

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

  it('should throw error if editing ocurr any error', async () => {
    const user = UserMother.random();
    const editUserDTO = EditUserDTOMother();
    jest.spyOn(DummyUserStorage.prototype, 'getById').mockResolvedValue(user);
    jest
      .spyOn(DummyUserStorage.prototype, 'edit')
      .mockRejectedValue(new Error('error in storage'));

    await expect(
      editUserUseCase.execute(user.getId(), editUserDTO),
    ).rejects.toEqual(new Error('error in storage'));
  });

  it('should throw user not found if there is not user with userId', async () => {
    const userId = IdMother.random();
    const editUserDTO = EditUserDTOMother();
    jest.spyOn(DummyUserStorage.prototype, 'getById').mockResolvedValue(null);

    await expect(editUserUseCase.execute(userId, editUserDTO)).rejects.toEqual(
      new UserNotFound(userId),
    );
  });

  it('should update user', async () => {
    const user = UserMother.random();
    const editUser = EditUserDTOMother();
    const spyHash = jest.spyOn(DummyHashProvider.prototype, 'hash');
    const spyGetById = jest
      .spyOn(DummyUserStorage.prototype, 'getById')
      .mockImplementation(() => Promise.resolve(user));
    const spyEdit = jest
      .spyOn(DummyUserStorage.prototype, 'edit')
      .mockResolvedValue(null);

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
