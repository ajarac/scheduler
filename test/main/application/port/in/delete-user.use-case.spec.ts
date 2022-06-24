import { DeleteUserUseCase } from '@application/port/in/delete-user.use-case';
import { DummyUserStorage } from '../out/dummy-user.storage';
import { UserStorage } from '@application/port/out/user.storage';
import { faker } from '@faker-js/faker';
describe('Delete User Use Case', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let dummyUserStorage: UserStorage;

  beforeEach(() => {
    dummyUserStorage = new DummyUserStorage();
    deleteUserUseCase = new DeleteUserUseCase(dummyUserStorage);
  });

  it('should delete user', () => {
    const spy = jest.spyOn(DummyUserStorage.prototype, 'delete');
    const userId = faker.datatype.uuid();

    deleteUserUseCase.execute(userId);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(userId);
  });
});
