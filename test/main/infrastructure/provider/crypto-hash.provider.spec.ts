import { faker } from '@faker-js/faker';
import { HashProvider } from '@application/out/hash.provider';
import { CryptoHashProvider } from '@infrastructure/provider/crypto-hash.provider';

describe('Crypto Hash Provider', () => {
  let hashProvider: HashProvider;
  const REGEX_SHA_256 = /^[a-f0-9]{64}$/gi;

  beforeEach(() => {
    hashProvider = new CryptoHashProvider();
  });

  it('should generate a sha256 hash', () => {
    const message = faker.lorem.sentence();

    const hashed = hashProvider.hash(message);

    expect(REGEX_SHA_256.test(hashed)).toBe(true);
    expect(typeof hashed).toBe('string');
  });
});
