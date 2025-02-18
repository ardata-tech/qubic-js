import { QubicBase } from "../base";
import { QubicProvider } from "../provider";
import {
  IBroadcastTransactionResponse,
  IGetApproveTransactions,
  IGetTransactionsStatus,
  IGetTransaction,
  IGetTransferTransaction,
} from "../types";

export class Transaction extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
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

  async generateEncodedTransaction(
    sourcePublicKey:string,
    signSeed:string,
    action: "SELL" | "BUY" | "CANCEL_SELL" | "CANCEL_BUY"
  ) {

    switch (action) {
      case "SELL": break;
      case "BUY": break;
      case "CANCEL_SELL": break;
      case "CANCEL_BUY": break;
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
}
