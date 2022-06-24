import { DeleteUserUseCase } from '@application/port/in/user/delete-user.use-case';
import { DummyUserStorage } from '../../out/dummy-user.storage';
import { IdMother } from '@test/domain/id.mother';
import { UserStorage } from '@application/port/out/user.storage';

describe('Delete User Use Case', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let dummyUserStorage: UserStorage;

  beforeEach(() => {
    dummyUserStorage = new DummyUserStorage();
    deleteUserUseCase = new DeleteUserUseCase(dummyUserStorage);
  });

  it('should delete user', () => {
    const spy = jest.spyOn(DummyUserStorage.prototype, 'delete');
    const userId = IdMother.random();

    deleteUserUseCase.execute(userId);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(userId);
  });
});
