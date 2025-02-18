import crypto from '../crypto';
import { QubicBase } from "../base";
import { QubicProvider } from "../provider";
import { QubicConstants } from '../constants';
import BigNumber from 'bignumber.js';
import {
  IBroadcastTransactionResponse,
  IGetBalanceByIdentity,
  IGetIssuedAssets,
  IGetApproveTransactions,
  IGetTransactionsStatus,
  IGetTransaction,
  IGetTransferTransaction,
  IGetOwnedAssets,
  IGetPossessedAssets,
} from "../types";

export class Identity extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
  }

  /**
   * Retrieves the list of assets owned by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch owned assets.
   * @returns {Promise<any>} A promise that resolves to the list of owned assets, or null if an error occurred.
   */
  async getOwnedAssets(identity: string): Promise<IGetOwnedAssets|null> {
    return await this.httpClient
      .call<IGetOwnedAssets>(`/${this.version}/assets/${identity}/owned`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching issued assets:", error);
        return null;
      });
  }

  /**
   * Retrieves the list of assets possessed by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch possessed assets.
   * @returns {Promise<any>} A promise that resolves to the list of possessed assets, or null if an error occurred.
   */
  async getPossessedAssets(identity: string): Promise<IGetPossessedAssets|null> {
    return this.httpClient
      .call<IGetPossessedAssets>(
        `/${this.version}/assets/${identity}/possessed`,
        "GET"
      )
      .catch((error) => {
        this.logger.error("Error fetching possessed assets:", error);
        return null;
      });
  }

  /**
   * Retrieves the list of assets issued by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch issued assets.
   * @returns {Promise<any>} A promise that resolves to the list of issued assets, or null if an error occurred.
   */
  async getIssuedAssets(identity: string): Promise<IGetIssuedAssets | null> {
    return await this.httpClient
      .call<IGetIssuedAssets>(
        `/${this.version}/assets/${identity}/issued`,
        "GET"
      )
      .catch((error) => {
        this.logger.error("Error fetching issued assets:", error);
        return null;
      });
  }

  /**
   * Fetches the balance of a specific address ID.
   *
   * @param {string} addressID The address ID for which to fetch the balance.
   * @returns {Promise<any>} A promise that resolves to the balance, or null if an error occurred.
   */
  async getBalanceByAddress(addressID: string): Promise<any> {
    return await this.httpClient
      .call(`/${this.version}/balances/${addressID}`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching balance:", error);
        return null;
      });
  }

  /**
   * Retrieves the balance of a specific identity.
   *
   * @param {string} Id The identity for which to fetch the balance.
   * @returns {Promise<IGetBalanceByIdentity | null>} A promise that resolves to the balance, or null if an error occurred.
   */
  async getBalanceByIdentity(
    Id: string
  ): Promise<IGetBalanceByIdentity | null> {
    return await this.httpClient
      .call<IGetBalanceByIdentity>(`/${this.version}/balances/${Id}`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching balance:", error);
        return null;
      });
  }

  /**
   * Retrieves a list of approved transactions for the given tick.
   *
   * @param {number} tickNumber - The tick number for which to fetch approved transactions.
   * @returns {Promise<any>} A promise that resolves to the list of approved transactions, or null if an error occurred.
   */
  async getApprovedTransactions(
    tickNumber: number
  ): Promise<IGetApproveTransactions | null> {
    return await this.httpClient
      .call<IGetApproveTransactions>(
        `/${this.version}/ticks/${tickNumber}/approved-transactions`,
        "GET"
      )
      .catch((error) => {
        this.logger.error("Error fetching approved transactions:", error);
        return null;
      });
  }

  /**
   * Retrieves the status of a specific transaction.
   *
   * @param {number} txId - The transaction ID for which to fetch the status.
   * @returns {Promise<any>} A promise that resolves to the transaction status, or null if an error occurred.
   */
  async getTransactionsStatus(
    txId: string
  ): Promise<IGetTransactionsStatus | null> {
    return await this.httpClient
      .call<IGetTransactionsStatus>(`/${this.version}/tx-status/${txId}`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching transactions status:", error);
        return null;
      });
  }

  /**
   * Retrieves details of a specific transaction.
   *
   * @param {number} txId - The transaction ID for which to fetch transaction details.
   * @returns {Promise<any>} A promise that resolves to the transaction details, or null if an error occurred.
   */
  async getTransactions(txId: string): Promise<IGetTransaction | null> {
    return await this.httpClient
      .call<IGetTransaction>(`/${this.version}/transactions/${txId}`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching latest tick:", error);
        return null;
      });
  }

  /**
   * Retrieves transfer transactions for a specific identity within a tick range.
   *
   * @param {number} identity - The identity for which to fetch transfer transactions.
   * @returns {Promise<any>} A promise that resolves to the list of transfer transactions, or null if an error occurred.
   */
  async getTransferTransactions(
    identity: string
  ): Promise<IGetTransferTransaction | null> {
    return await this.httpClient
      .call<IGetTransferTransaction>(
        `/${this.version}/identities/${identity}/transfer-transactions`,
        "GET"
      )
      .catch((error) => {
        this.logger.error("Error fetching latest tick:", error);
        return null;
      });
  }

  /**
   * Broadcast a transaction.
   *
   * @param {string} encodedTransaction The encoded transaction to be broadcast.
   * @returns {Promise<IBroadcastTransactionResponse | null>} A promise that resolves to the broadcast transaction response, or null if an error occurred.
   */
  async broadcastTransaction(
    encodedTransaction: string
  ): Promise<IBroadcastTransactionResponse | null> {
    try {
      return await this.httpClient.call<IBroadcastTransactionResponse>(
        `/${this.version}/broadcast-transaction`,
        "POST",
        { encodedTransaction }
      );
    } catch (error) {
      this.logger.error("Error broadcast transaction:", error);
      return null;
    }
  }

  async createTransaction(from: string, to: string, amount: number) {
    return { from, to, amount, nonce: Date.now() };
  }

  async signTransaction(tx: any): Promise<any> {
    return { ...tx, signature: "mock-signature" };
  }

  async sendTransaction(signedTx: any): Promise<string> {
    return "mock-tx-hash";
  }

  /**
   * Verifies whether an identity string is valid by checking its length,
   * ensuring it contains only uppercase letters, and comparing it with 
   * the derived identity from its public key.
   * 
   * @param {string} identity - The identity string to verify.
   * @returns {Promise<boolean>} - Returns `true` if the identity is valid, otherwise `false`.
   */
  public async verifyIdentity(identity: string): Promise<boolean> {
    if (!identity || identity.length !== 60 || !/^[A-Z]+$/.test(identity)) {
      return false;
    }
    
    // Convert the identity string into its public key bytes
    const publicKey = this.getIdentityBytes(identity);
    
    // Derive the identity from the public key
    const idFromBytes = await this.getIdentity(publicKey);
    
    // Compare the original identity with the derived one
    return identity === idFromBytes;
  }

  /**
   * Generates a complete ID package, including a public-private key pair and 
   * a derived public identity, based on the provided seed.
   * 
   * @param {string} seed - The seed string used to generate the ID package.
   * @returns {Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }>} 
   *          - The generated ID package containing:
   *            - `publicKey`: The generated public key as a byte array.
   *            - `privateKey`: The corresponding private key as a byte array.
   *            - `publicId`: The derived public identity string.
   */
  async createIdPackage(seed: string): Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }> {
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
   * Generates a public key and a public identity string from a given private key.
   * 
   * @param {Uint8Array} privateKey - The private key as a byte array.
   * @returns {Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }>} 
   *          - The generated ID package containing:
   *            - `publicKey`: The generated public key as a byte array.
   *            - `publicId`: The derived public identity string.
   */
  async createIdPackageFromPrivateKey(privateKey: Uint8Array): Promise<{ publicKey: Uint8Array, publicId: string }> {
    const { schnorrq } = await crypto;
    // Derive the public key from the private key
    const publicKey = schnorrq.generatePublicKey(privateKey);

    // Compute the public identity from the public key
    const publicId = await this.getIdentity(publicKey);

    return { publicKey, publicId };
  }

  /**
   * Generates a private key from a seed using an iterative process.
   * 
   * @param {string} seed - The input seed string.
   * @param {number} index - Iteration index for modifying the seed.
   * @param {any} K12 - Cryptographic hashing function.
   * @returns {Uint8Array} - The generated private key as a byte array.
   */
  private generatePrivateKey(seed: string, index: number, K12: any): Uint8Array {
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
   * 
   * @param {string} seed - The seed string to convert.
   * @returns {Uint8Array} - The corresponding byte representation.
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
   * Derives a public identity string from a given public key.
   * 
   * @param {Uint8Array} publicKey - The public key as a byte array.
   * @param {boolean} [lowerCase=false] - Whether to return the identity in lowercase.
   * @returns {Promise<string>} - The computed public identity string.
   */
  private async getIdentity(publicKey: Uint8Array, lowerCase: boolean = false): Promise<string> {
    let newId = '';

    // Process the public key in chunks to generate an identity string
    for (let i = 0; i < 4; i++) {
      let longNumber = new BigNumber(0);
      longNumber.decimalPlaces(0);

      // Convert each byte chunk into a large numerical representation
      publicKey.slice(i * 8, (i + 1) * 8).forEach((val, index) => {
        longNumber = longNumber.plus(new BigNumber((val * 256 ** index).toString(2), 2));
      });

      // Convert the number into an alphanumeric identity segment
      for (let j = 0; j < 14; j++) {
        newId += String.fromCharCode(longNumber.mod(26).plus((lowerCase ? 'a' : 'A').charCodeAt(0)).toNumber());
        longNumber = longNumber.div(26);
      }
    }

    // Generate a checksum for identity validation
    const checksum = await this.getCheckSum(publicKey);
    let identityBytesChecksum = (checksum[2] << 16) | (checksum[1] << 8) | checksum[0];
    identityBytesChecksum &= 0x3FFFF;

    // Append checksum-derived characters to the identity
    for (let i = 0; i < 4; i++) {
      newId += String.fromCharCode(identityBytesChecksum % 26 + (lowerCase ? 'a' : 'A').charCodeAt(0));
      identityBytesChecksum /= 26;
    }

    return newId;
  }

  /**
   * Computes a cryptographic checksum for a given public key.
   * 
   * @param {Uint8Array} publicKey - The public key for which to compute the checksum.
   * @returns {Promise<Uint8Array>} - The computed checksum as a byte array.
   */
  private async getCheckSum(publicKey: Uint8Array): Promise<Uint8Array> {
    const { K12 } = await crypto;

    // Compute a cryptographic digest of the public key
    const digest = new Uint8Array(QubicConstants.DIGEST_LENGTH);
    K12(publicKey, digest, QubicConstants.DIGEST_LENGTH);

    // Extract and return the checksum from the digest
    return digest.slice(0, QubicConstants.CHECKSUM_LENGTH);
  }

  /**
   * Converts an identity string into its corresponding public key bytes.
   * 
   * @param {string} identity - The identity string to convert.
   * @returns {Uint8Array} - The resulting public key as a byte array.
   */
  private getIdentityBytes(identity: string): Uint8Array {
    const publicKeyBytes = new Uint8Array(32);
    const view = new DataView(publicKeyBytes.buffer, 0);

    // Convert identity characters into numerical values and reconstruct public key
    for (let i = 0; i < 4; i++) {
      view.setBigUint64(i * 8, 0n, true);
      for (let j = 14; j-- > 0;) {
        view.setBigUint64(
          i * 8, 
          view.getBigUint64(i * 8, true) * 26n + BigInt(identity.charCodeAt(i * 14 + j)) - BigInt('A'.charCodeAt(0)), 
          true
        );
      }
    }

    return publicKeyBytes;
  }
}
