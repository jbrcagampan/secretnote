import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptionService {
  iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
  key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
  async encrypt(note: string): Promise<string> {
    const key = (await promisify(scrypt)(this.key, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);
    let encryptedText = cipher.update(note, 'utf-8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText;
  }

  async decrypt(note: string): Promise<string> {
    const key = (await promisify(scrypt)(this.key, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    let decryptedText = decipher.update(note, 'hex', 'utf-8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
  }
}
