import crypto from '../crypto';

export class QubicKeyHelper {
    private readonly SEED_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
    private readonly PRIVATE_KEY_LENGTH = 32;
    private readonly PUBLIC_KEY_LENGTH = 32;
    private readonly DIGEST_LENGTH = 32;
    private readonly CHECKSUM_LENGTH = 4;
    private readonly ID_LENGTH = 60;

    /**
     * Generates a private key from a seed phrase
     * @param seed The seed phrase (55 lowercase letters)
     * @param index Key index for key derivation
     * @returns Generated private key
     */
    public async generatePrivateKey(seed: string, index: number = 0): Promise<Uint8Array> {
        const { K12 } = await crypto;
        const byteSeed = this.seedToBytes(seed);
        const preimage = byteSeed.slice();

        while (index-- > 0) {
            for (let i = 0; i < preimage.length; i++) {
                if (++preimage[i] > this.SEED_ALPHABET.length) {
                    preimage[i] = 1;
                } else {
                    break;
                }
            }
        }

        const key = new Uint8Array(this.PRIVATE_KEY_LENGTH);
        K12(preimage, key, this.PRIVATE_KEY_LENGTH);
        return key;
    }

    /**
     * Generates a public key from a private key
     * @param privateKey The private key to generate from
     * @returns Corresponding public key
     */
    public async generatePublicKey(privateKey: Uint8Array): Promise<Uint8Array> {
        const { schnorrq } = await crypto;
        return schnorrq.generatePublicKey(privateKey);
    }

    /**
     * Generates a human-readable Qubic ID from a public key
     * @param publicKey The public key to convert
     * @param lowerCase Whether to use lowercase letters
     * @returns Human-readable ID with checksum
     */
    public async getQubicId(publicKey: Uint8Array, lowerCase: boolean = false): Promise<string> {
        let id = '';
        for (let i = 0; i < 4; i++) {
            let longNumber = BigInt(0);
            publicKey.slice(i * 8, (i + 1) * 8).forEach((val, index) => {
                longNumber += BigInt(val) << BigInt(index * 8);
            });
            for (let j = 0; j < 14; j++) {
                const charCode = Number(longNumber % BigInt(26)) + (lowerCase ? 'a' : 'A').charCodeAt(0);
                id += String.fromCharCode(charCode);
                longNumber = longNumber / BigInt(26);
            }
        }

        // Add checksum
        const checksum = await this.calculateChecksum(publicKey);
        id += checksum;
        return id;
    }

    /**
     * Converts a Qubic ID back to its raw public key bytes
     * @param id The Qubic ID to convert
     * @returns Public key bytes
     */
    public qubicIdToBytes(id: string): Uint8Array {
        if (id.length !== this.ID_LENGTH) throw new Error('Invalid Qubic ID length');
        
        const publicKeyBytes = new Uint8Array(32);
        const view = new DataView(publicKeyBytes.buffer);
        const baseCharCode = 'A'.charCodeAt(0);

        for (let i = 0; i < 4; i++) {
            let value = BigInt(0);
            for (let j = 13; j >= 0; j--) {
                const char = id[i * 14 + j];
                const charValue = BigInt(char.charCodeAt(0) - baseCharCode);
                value = value * BigInt(26) + charValue;
            }
            view.setBigUint64(i * 8, value, true);
        }

        return publicKeyBytes;
    }

    /**
     * Verifies the validity of a Qubic ID
     * @param id The ID to verify
     * @returns True if the ID is valid
     */
    public async verifyQubicId(id: string): Promise<boolean> {
        if (id.length !== this.ID_LENGTH || !/^[A-Za-z]+$/.test(id)) return false;

        try {
            const publicKey = this.qubicIdToBytes(id.toUpperCase());
            const reconstructedId = await this.getQubicId(publicKey);
            return id.toUpperCase() === reconstructedId;
        } catch {
            return false;
        }
    }

    /**
     * Creates a complete identity package from a seed
     * @param seed The seed phrase to use
     * @returns Object containing private key, public key, and Qubic ID
     */
    public async createIdentityPackage(seed: string): Promise<{
        privateKey: Uint8Array;
        publicKey: Uint8Array;
        qubicId: string;
    }> {
        const privateKey = await this.generatePrivateKey(seed);
        const publicKey = await this.generatePublicKey(privateKey);
        const qubicId = await this.getQubicId(publicKey);
        return { privateKey, publicKey, qubicId };
    }

    private seedToBytes(seed: string): Uint8Array {
        if (seed.length !== 55) throw new Error('Invalid seed length');
        const bytes = new Uint8Array(seed.length);
        for (let i = 0; i < seed.length; i++) {
            const index = this.SEED_ALPHABET.indexOf(seed[i]);
            if (index === -1) throw new Error('Invalid seed characters');
            bytes[i] = index;
        }
        return bytes;
    }

    private async calculateChecksum(publicKey: Uint8Array): Promise<string> {
        const { K12 } = await crypto;
        const digest = new Uint8Array(this.DIGEST_LENGTH);
        K12(publicKey, digest, this.DIGEST_LENGTH);
        
        let checksumValue = 0;
        for (let i = 0; i < this.CHECKSUM_LENGTH - 1; i++) {
            checksumValue = (checksumValue << 8) | digest[i];
        }

        let checksum = '';
        for (let i = 0; i < this.CHECKSUM_LENGTH; i++) {
            const charValue = checksumValue % 26;
            checksum = String.fromCharCode(charValue + 'A'.charCodeAt(0)) + checksum;
            checksumValue = Math.floor(checksumValue / 26);
        }

        return checksum;
    }
}