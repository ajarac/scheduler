import { HashProvider } from '@user/domain/hash.provider';

export class DummyHashProvider implements HashProvider {
  hash(content: string): string {
    return `dummy-${content}-hash`;
  }
}
