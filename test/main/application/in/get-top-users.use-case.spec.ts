import { UserStorage } from '@application/out/user.storage';
import { GetTopUsersUseCase } from '@application/in/get-top-users.use-case';
import { DummyUserStorage } from '@test/application/out/dummy-user.storage';
import { Order } from '@shared/short';
import { UserMother } from '@test/domain/user/user.mother';
import { DateTime } from 'luxon';

describe('Get Top Users Use Case', () => {
  let userStorage: UserStorage;
  let getTopUsersUseCase: GetTopUsersUseCase;

  beforeEach(() => {
    userStorage = new DummyUserStorage();
    getTopUsersUseCase = new GetTopUsersUseCase(userStorage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if getting users ocurr any error', async () => {
    jest.spyOn(DummyUserStorage.prototype, 'getTopUsers').mockRejectedValue(new Error('error in storage'));

    await expect(getTopUsersUseCase.execute(Order.DESC, new Date(), new Date())).rejects.toEqual(new Error('error in storage'));
  });

  it('should return get top users calculated by the storage', async () => {
    const size = 10;
    const userDTOsExpected = UserMother.randomDTOListAsc(size);
    const from = DateTime.now().minus({ day: 1 }).toJSDate();
    const to = new Date();
    const spy = jest.spyOn(DummyUserStorage.prototype, 'getTopUsers').mockResolvedValue(userDTOsExpected);

    const userDTOs = await getTopUsersUseCase.execute(Order.ASC, from, to);

    expect(userDTOs.length).toBe(size);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(Order.ASC, from, to);
  });
});
