export const HASH_PROVIDER_TOKEN = Symbol('HASH_PROVIDER_TOKEN');

export interface HashProvider {
  hash(content: string): string;
}
