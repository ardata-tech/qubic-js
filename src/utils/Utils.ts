import crypto from '../crypto';
import { randomInt } from 'crypto'; 

export class Utils {
    private SEED_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
    private PRIVATE_KEY_LENGTH = 32;
    private PUBLIC_KEY_LENGTH = 32;
    private CHECKSUM_LENGTH = 3;

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

    /**
     * Convert a seed to bytes.
     *
     * @param {string} seed - The seed to convert.
     * @returns {Uint8Array} The byte representation of the seed.
     */
    private seedToBytes(seed: string): Uint8Array {
        const bytes = new Uint8Array(seed.length);
        for (let i = 0; i < seed.length; i++) {
            bytes[i] = this.SEED_ALPHABET.indexOf(seed[i]);
        }
        return bytes;
    };

    /**
     * 
     * Creates a complete ID Package based on the provided seed
     * 
     * @param seed 
     * @returns 
     */
        public async createIdPackage(seed: string): Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }> {

            const { schnorrq, K12 } = await crypto;
    
            const privateKey = this.privateKey(seed, 0, K12);
            const publicKey = schnorrq.generatePublicKey(privateKey);
            const publicId = await this.getIdentity(publicKey);
    
            return {publicKey, privateKey, publicId };
        }
}