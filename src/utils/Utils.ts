import { randomInt } from 'crypto';
import { QubicConstants } from '../constants';

export class Utils {
    /**
     * Create a secure 55-character lowercase seed.
     *
     * @returns {string} The securely generated seed.
     */
    static createSeed(): string {
        const length = 55;
        let seed = '';

        for (let i = 0; i < length; i++) {
        seed += QubicConstants.SEED_ALPHABET[randomInt(0, QubicConstants.SEED_ALPHABET.length)];
        }

        return seed;
    }
}