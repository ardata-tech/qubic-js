import { randomInt } from 'crypto';

export class Utils {
  /**
   * Create a secure 55-character lowercase seed.
   *
   * @returns {string} The securely generated seed.
   */
  static createSeed(): string {
    const length = 55;
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    let seed = '';

    for (let i = 0; i < length; i++) {
      seed += charset[randomInt(0, charset.length)];
    }

    return seed;
  }
}
