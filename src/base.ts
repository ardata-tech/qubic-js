import { HttpClient } from "./client/http";
import { QubicLogger as _logger } from "./logger";
import { Logger } from "winston";
import { QubicProvider } from "./provider";
import { IQubicProviderOptions } from "./types";
import { QubicConstants } from "./constants";
import crypto from "./crypto";
import BigNumber from "bignumber.js";

export class QubicBase {
  httpClient: HttpClient;
  providerOptions: IQubicProviderOptions;
  version: string;
  logger: Logger;

  constructor(provider: QubicProvider) {
    this.providerOptions = provider.getProviderOptions();
    this.version = `v${this.providerOptions.version}`;
    this.httpClient = new HttpClient(this.providerOptions.providerUrl);
    this.logger = _logger;
  }

  /**
   * Derives a public identity string from a given public key.
   */
  protected async getIdentity(
    publicKey: Uint8Array,
    lowerCase: boolean = false,
  ): Promise<string> {
    let newId = "";

    // Process the public key in chunks to generate an identity string
    for (let i = 0; i < 4; i++) {
      let longNumber = new BigNumber(0);
      longNumber.decimalPlaces(0);

      // Convert each byte chunk into a large numerical representation
      publicKey.slice(i * 8, (i + 1) * 8).forEach((val, index) => {
        longNumber = longNumber.plus(
          new BigNumber((val * 256 ** index).toString(2), 2),
        );
      });

      // Convert the number into an alphanumeric identity segment
      for (let j = 0; j < 14; j++) {
        newId += String.fromCharCode(
          longNumber
            .mod(26)
            .plus((lowerCase ? "a" : "A").charCodeAt(0))
            .toNumber(),
        );
        longNumber = longNumber.div(26);
      }
    }

    // Generate a checksum for identity validation
    const checksum = await this.getCheckSum(publicKey);
    let identityBytesChecksum =
      (checksum[2] << 16) | (checksum[1] << 8) | checksum[0];
    identityBytesChecksum &= 0x3ffff;

    // Append checksum-derived characters to the identity
    for (let i = 0; i < 4; i++) {
      newId += String.fromCharCode(
        (identityBytesChecksum % 26) + (lowerCase ? "a" : "A").charCodeAt(0),
      );
      identityBytesChecksum /= 26;
    }

    return newId;
  }

  /**
   * Converts a public identity string into a byte array.
   */
  protected getIdentityBytes(identity: string): Uint8Array {
    const publicKeyBytes = new Uint8Array(32);
    const view = new DataView(publicKeyBytes.buffer, 0);

    // Convert identity characters into numerical values and reconstruct public key
    for (let i = 0; i < 4; i++) {
      view.setBigUint64(i * 8, 0n, true);
      for (let j = 14; j-- > 0; ) {
        view.setBigUint64(
          i * 8,
          view.getBigUint64(i * 8, true) * 26n +
            BigInt(identity.charCodeAt(i * 14 + j)) -
            BigInt("A".charCodeAt(0)),
          true,
        );
      }
    }

    return publicKeyBytes;
  }

  /**
   * Generates a complete ID package, including a public-private key pair and
   * a derived public identity, based on the provided seed.
   */
  protected async createIdPackage(seed: string): Promise<{
    publicKey: Uint8Array;
    privateKey: Uint8Array;
    publicId: string;
  }> {
    const { schnorrq, K12 } = await crypto;

    // Generate a private key using the seed and hash function K12
    const privateKey = this.generatePrivateKey(seed, 0, K12);

    // Derive the public key from the private key
    const publicKey = schnorrq.generatePublicKey(privateKey);

    // Compute the public identity from the public key
    const publicId = await this.getIdentity(publicKey);

    return { publicKey, privateKey, publicId };
  }

  /**
   * Generates a private key from a seed using an iterative process.
   */
  private generatePrivateKey(
    seed: string,
    index: number,
    K12: any,
  ): Uint8Array {
    // Convert the seed string into a byte array
    const byteSeed = this.seedToBytes(seed);

    // Modify the byte array based on the iteration index
    const preimage = byteSeed.slice();
    while (index-- > 0) {
      for (let i = 0; i < preimage.length; i++) {
        if (++preimage[i] > QubicConstants.SEED_ALPHABET.length) {
          preimage[i] = 1;
        } else {
          break;
        }
      }
    }

    // Generate a private key using the K12 cryptographic function
    const key = new Uint8Array(QubicConstants.PRIVATE_KEY_LENGTH);
    K12(preimage, key, QubicConstants.PRIVATE_KEY_LENGTH);

    return key;
  }

  /**
   * Converts a seed string into a byte array using the predefined alphabet.
   */
  private seedToBytes(seed: string): Uint8Array {
    const bytes = new Uint8Array(seed.length);

    // Convert each character in the seed to its corresponding index in the alphabet
    for (let i = 0; i < seed.length; i++) {
      bytes[i] = QubicConstants.SEED_ALPHABET.indexOf(seed[i]);
    }

    return bytes;
  }

  /**
   * Computes a cryptographic checksum for a given public key.
   */
  private async getCheckSum(publicKey: Uint8Array): Promise<Uint8Array> {
    const { K12 } = await crypto;

    // Compute a cryptographic digest of the public key
    const digest = new Uint8Array(QubicConstants.DIGEST_LENGTH);
    K12(publicKey, digest, QubicConstants.DIGEST_LENGTH);

    // Extract and return the checksum from the digest
    return digest.slice(0, QubicConstants.CHECKSUM_LENGTH);
  }
}
