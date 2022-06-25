import { HashProvider } from '@user/application/port/out/hash.provider';

export class DummyHashProvider implements HashProvider {
  hash(content: string): string {
    return `dummy-${content}-hash`;
  }
}
