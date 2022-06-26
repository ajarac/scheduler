import { DeleteUserUseCase } from '@application/in/delete-user.use-case';
import { UserStorage } from '@application/out/user.storage';

import { DummyUserStorage } from '../out/dummy-user.storage';
import { IdMother } from '@test/domain/id.mother';

describe('Delete User Use Case', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let dummyUserStorage: UserStorage;

  beforeEach(() => {
    dummyUserStorage = new DummyUserStorage();
    deleteUserUseCase = new DeleteUserUseCase(dummyUserStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if deleting ocurr any error', async () => {
    const userId = IdMother.random();
    jest.spyOn(DummyUserStorage.prototype, 'delete').mockRejectedValue(new Error('error in storage'));

    await expect(deleteUserUseCase.execute(userId)).rejects.toEqual(new Error('error in storage'));
  });

  it('should delete user', async () => {
    const spy = jest.spyOn(DummyUserStorage.prototype, 'delete').mockResolvedValue();

    const userId = IdMother.random();

    await deleteUserUseCase.execute(userId);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(userId);
  });
});
