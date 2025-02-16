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

    /**
     * Convert a seed to bytes.
     *
     * @param {string} seed - The seed to convert.
     * @returns {Uint8Array} The byte representation of the seed.
     */
    static seedToBytes(seed: string): Uint8Array {
        const bytes = new Uint8Array(seed.length);
        for (let i = 0; i < seed.length; i++) {
            bytes[i] = QubicConstants.SEED_ALPHABET.indexOf(seed[i]);
        }
        return bytes;
    };
}