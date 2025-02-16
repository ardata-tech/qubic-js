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

export class Wallet extends QubicBase {
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
   * 
   * Creates a complete ID Package based on the provided seed
   * 
   * @param {string} seed The seed to generate the ID package from.
   * @returns {Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }>} The generated ID package.
   */
  async createIdPackage(seed: string): Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }> {
    const { schnorrq, K12 } = await crypto
    const privateKey = this.generatePrivateKey(seed, 0, K12);
    const publicKey = schnorrq.generatePublicKey(privateKey);
    const publicId = await this.getIdentity(publicKey)
    return {publicKey, privateKey, publicId };
  }

  private generatePrivateKey(seed: string, index: number, K12: any): Uint8Array {
    const byteSeed = this.seedToBytes(seed);
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
    const key = new Uint8Array(QubicConstants.PRIVATE_KEY_LENGTH);
    K12(preimage, key, QubicConstants.PRIVATE_KEY_LENGTH);
    return key;
  }

  private seedToBytes(seed: string): Uint8Array {
    const bytes = new Uint8Array(seed.length);
    for (let i = 0; i < seed.length; i++) {
        bytes[i] = QubicConstants.SEED_ALPHABET.indexOf(seed[i]);
    }
    return bytes;
  };

  private async getIdentity(publicKey: Uint8Array, lowerCase: boolean = false): Promise<string> {
    let newId = '';
    for (let i = 0; i < 4; i++) {
        let longNUmber = new BigNumber(0);
        longNUmber.decimalPlaces(0);
        publicKey.slice(i * 8, (i + 1) * 8).forEach((val, index) => {
            longNUmber = longNUmber.plus(new BigNumber((val * 256 ** index).toString(2), 2));
        });
        for (let j = 0; j < 14; j++) {
            newId += String.fromCharCode(longNUmber.mod(26).plus((lowerCase ? 'a' : 'A').charCodeAt(0)).toNumber());
            longNUmber = longNUmber.div(26);
        }
    }
    
    // calculate checksum
    const checksum = await this.getCheckSum(publicKey);

    // convert to int
    let identityBytesChecksum = (checksum[2] << 16) | (checksum[1] << 8) | checksum[0];
    identityBytesChecksum = identityBytesChecksum & 0x3FFFF;
    
    for (let i = 0; i < 4; i++) {
        newId += String.fromCharCode(identityBytesChecksum % 26 + (lowerCase ? 'a' : 'A').charCodeAt(0));
        identityBytesChecksum = identityBytesChecksum / 26;
    }
    return newId;
  }

  private async getCheckSum(publicKey: Uint8Array): Promise<Uint8Array> {
    const { K12 } = await crypto;
    const digest = new Uint8Array(QubicConstants.DIGEST_LENGTH);
    K12(publicKey, digest, QubicConstants.DIGEST_LENGTH);
    const checksum = digest.slice(0, QubicConstants.CHECKSUM_LENGTH);
    return checksum;
  }
}
