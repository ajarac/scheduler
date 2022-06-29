import { UserStorage } from '@application/out/user.storage';
import { GetUsersUseCase } from '@application/in/get-users.use-case';
import { DummyUserStorage } from '@test/application/out/dummy-user.storage';
import { UserMother } from '@test/domain/user/user.mother';
import { userDomainToDTO } from '@application/dto/user.dto';

describe('Get Users Use Case', () => {
  let userStorage: UserStorage;
  let getUsersUseCase: GetUsersUseCase;

  beforeEach(() => {
    userStorage = new DummyUserStorage();
    getUsersUseCase = new GetUsersUseCase(userStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if getting users ocurr any error', async () => {
    jest.spyOn(DummyUserStorage.prototype, 'getUsers').mockRejectedValue(new Error('error in storage'));

    await expect(getUsersUseCase.execute()).rejects.toEqual(new Error('error in storage'));
  });

  it('should get users without password', async () => {
    const size = 10;
    const usersRandom = UserMother.randomList(size);
    const usersExpected = usersRandom.map(userDomainToDTO);
    const spy = jest.spyOn(DummyUserStorage.prototype, 'getUsers').mockResolvedValue(usersRandom);

    const users = await getUsersUseCase.execute();

    expect(users.length).toBe(size);
    expect(users).toEqual(usersExpected);
    expect(spy).toBeCalledTimes(1);
  });
});
