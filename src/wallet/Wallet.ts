import crypto from '../crypto';
import { QubicBase } from "../base";
import { QubicProvider } from "../provider";
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
   * @param seed 
   * @returns 
   */
  async createIdPackage(seed: string): Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }> {
    const { schnorrq, K12 } = await crypto
    const privateKey = this.privateKey(seed, 0, K12);
    const publicKey = schnorrq.generatePublicKey(privateKey);
    const publicId = await this.getIdentity(publicKey)
    return {publicKey, privateKey, publicId };
  }
}
