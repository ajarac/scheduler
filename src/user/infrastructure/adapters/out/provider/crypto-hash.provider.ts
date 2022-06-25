import { Injectable } from '@nestjs/common';
import { HashProvider } from '@user/application/port/out/hash.provider';
import * as sha256 from 'crypto-js/sha256';

@Injectable()
export class CryptoHashProvider implements HashProvider {
  hash(content: string): string {
    return sha256(content);
  }
}
