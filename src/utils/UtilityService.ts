import { QubicConstants } from "../constants";

export class UtilityService {
  /**
   * Create a secure 55-character lowercase seed.
   *
   * @returns {string} The securely generated seed.
   */
  static createSeed(): string {
    const length = 55;
    const alphabet = QubicConstants.SEED_ALPHABET;
    const alphabetLength = alphabet.length;
    let seed = "";
  
    for (let i = 0; i < length; i++) {
      seed += alphabet[Math.floor(Math.random() * alphabetLength)];
    }
  
    return seed;
  }
  

  /**
   * Convert a byte array to a shifted hexadecimal representation.
   *
   * @param {Uint8Array} bytes - The byte array to convert.
   * @returns {string} The shifted hexadecimal string representation.
   */
  static bytesToShiftedHex(bytes: Uint8Array): string {
    const SHIFTED_HEX_CHARS = "abcdefghijklmnop";
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex +=
        SHIFTED_HEX_CHARS[bytes[i] >> 4] + SHIFTED_HEX_CHARS[bytes[i] & 15];
    }
    return hex.toUpperCase();
  }

  /**
   * Convert a public key string to a byte array.
   *
   * @param {string} s - The public key string.
   * @returns {Uint8Array} The byte array representation of the public key.
   */
  static publicKeyStringToBytes(s: string): Uint8Array {
    const publicKeyBytes = new Uint8Array(32);
    const view = new DataView(publicKeyBytes.buffer, 0);

    for (let i = 0; i < 4; i++) {
      view.setBigUint64(i * 8, 0n, true);
      for (let j = 14; j-- > 0; ) {
        view.setBigUint64(
          i * 8,
          view.getBigUint64(i * 8, true) * 26n +
            BigInt(s.charCodeAt(i * 14 + j) - "A".charCodeAt(0)),
          true,
        );
      }
    }

    return publicKeyBytes;
  }

  /**
   * Convert a 32-byte array to a string representation.
   *
   * @param {Uint8Array} bytes - The byte array to convert.
   * @returns {string} The string representation.
   */
  static bytes32ToString(bytes: Uint8Array): string {
    const hex = this.bytesToShiftedHex(bytes);
    const buffer = new Uint8Array(32);
    const view = new DataView(buffer.buffer, 0);
    let s = "";

    for (let i = 0; i < bytes.length; i++) {
      view.setUint8(
        i,
        ((hex.charCodeAt(i << 1) - "A".charCodeAt(0)) << 4) |
          (hex.charCodeAt((i << 1) + 1) - "A".charCodeAt(0)),
      );
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 14; j++) {
        s += String.fromCharCode(
          Number(
            (view.getBigUint64(i * 8, true) % 26n) + BigInt("A".charCodeAt(0)),
          ),
        );
        view.setBigUint64(i * 8, view.getBigUint64(i * 8, true) / 26n, true);
      }
    }

    return s.toLowerCase();
  }

  /**
   * Convert a digest byte array to a string representation.
   *
   * @param {Uint8Array} bytes - The byte array to convert.
   * @returns {string} The string representation of the digest.
   */
  static digestBytesToString(bytes: Uint8Array): string {
    return this.bytes32ToString(bytes);
  }

  /**
   * Convert a public key byte array to a string representation.
   *
   * @param {Uint8Array} bytes - The byte array of the public key.
   * @returns {string} The string representation of the public key.
   */
  static publicKeyBytesToString(bytes: Uint8Array): string {
    if (bytes.length === 32) {
      return this.bytes32ToString(bytes).toUpperCase();
    }

    const hex = this.bytesToShiftedHex(bytes);
    const buffer = new Uint8Array(40);
    const view = new DataView(buffer.buffer, 0);
    let s = "";

    for (let i = 0; i < bytes.length; i++) {
      view.setUint8(
        i,
        ((hex.charCodeAt(i << 1) - "A".charCodeAt(0)) << 4) |
          (hex.charCodeAt((i << 1) + 1) - "A".charCodeAt(0)),
      );
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 14; j++) {
        s += String.fromCharCode(
          Number(
            (view.getBigUint64(i * 8, true) % 26n) + BigInt("A".charCodeAt(0)),
          ),
        );
        view.setBigUint64(i * 8, view.getBigUint64(i * 8, true) / 26n, true);
      }
    }

    view.setBigUint64(32, view.getBigUint64(32, true) & 0x3ffffn, true);

    for (let i = 0; i < 4; i++) {
      s += String.fromCharCode(
        Number((view.getBigUint64(32, true) % 26n) + BigInt("A".charCodeAt(0))),
      );
      view.setBigUint64(32, view.getBigUint64(32, true) / 26n, true);
    }

    return s.toUpperCase();
  }

  /**
   * Convert a seed string into a byte array.
   *
   * @param {string} seed - The seed string.
   * @returns {Uint8Array} The byte array representation of the seed.
   */
  static seedStringToBytes(seed: string): Uint8Array {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const bytes = new Uint8Array(seed.length);
    for (let i = 0; i < seed.length; i++) {
      bytes[i] = ALPHABET.indexOf(seed[i]);
    }
    return bytes;
  }

  /**
   * Convert a hexadecimal string to a base26 string.
   *
   * @param {Uint8Array} hex - The hexadecimal string to convert.
   * @returns {string} The base26 string representation.
   */
  static hexToBase26(hex: string): string {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    let n = BigInt(hex);
    const base26Array = [];
    const base = BigInt(ALPHABET.length);

    while (n > 0) {
      base26Array.push(ALPHABET[Number(n % base)]);
      n /= base;
    }

    return base26Array.reverse().join("");
  }

  /**
   * Convert a base26 string to a hexadecimal string.
   *
   * @param {string} base26 - The base26 string to convert.
   * @returns {string} The hexadecimal string representation.
   */
  static base26ToHex(base26: string): string {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const alphabetMap = new Map(
      ALPHABET.split("").map((char, i) => [char, BigInt(i)]),
    );
    let num = BigInt(0);
    const base = BigInt(26);

    for (const char of base26) {
      num = num * base + alphabetMap.get(char)!;
    }

    return "0x" + num.toString(16);
  }
}
