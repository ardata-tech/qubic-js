import { QubicBase } from "../base";
import { QubicConstants } from "../constants";
import { QubicProvider } from "../provider";
import crypto from "../crypto";
import { Transaction } from "./TransactionBuilder";
import {
  IBroadcastTransactionResponse,
  IGetApproveTransactions,
  IGetTransactionsStatus,
  IGetTransaction,
  IGetTransferTransaction,
} from "../types";

export class TransactionService extends QubicBase {
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
    tickNumber: number,
  ): Promise<IGetApproveTransactions | null> {
    return await this.httpClient
      .call<IGetApproveTransactions>(
        `/${this.version}/ticks/${tickNumber}/approved-transactions`,
        "GET",
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
    txId: string,
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
    identity: string,
  ): Promise<IGetTransferTransaction | null> {
    return await this.httpClient
      .call<IGetTransferTransaction>(
        `/${this.version}/identities/${identity}/transfer-transactions`,
        "GET",
      )
      .catch((error) => {
        this.logger.error("Error fetching latest tick:", error);
        return null;
      });
  }

  /**
   * Creates a transaction.
   *
   * @param {string} from - The source wallet address.
   * @param {string} to - The destination wallet address.
   * @param {number} amount - The amount to transfer.
   * @param {number} tick - The tick number.
   * @returns {Promise<Transaction>} - The transaction builder.
   */
  async createTransaction(
    from: string,
    to: string,
    amount: number,
    tick: number,
  ): Promise<Transaction> {
    const tb = new Transaction()
      .setSourceBytes(this.getIdentityBytes(from))
      .setDestinationBytes(this.getIdentityBytes(to))
      .setAmount(amount)
      .setTick(tick)
      .build();

    return tb;
  }

  /**
   * Encodes a transaction to a base64 string.
   *
   * @param {Uint8Array} transaction - The transaction to encode.
   * @returns {string} - The encoded transaction as a base64 string.
   */
  encodeTransactionToBase64(transaction: Uint8Array): string {
    const byteArray: Uint8Array = new Uint8Array(transaction);
    const str = String.fromCharCode.apply(null, Array.from(byteArray));
    return btoa(str);
  }

  /**
   * Signs a transaction using a private key and returns the signed transaction.
   *
   * @param {Uint8Array} transaction - The transaction to sign.
   * @param {Uint8Array} privateKey - The private key used to sign the transaction.
   * @returns {Promise<Uint8Array>} - The signed transaction as a byte array.
   */
  async signTransaction(
    transaction: Transaction,
    privateKey: Uint8Array,
  ): Promise<Uint8Array> {
    // Import the necessary cryptographic functions
    const { schnorrq, K12 } = await crypto;

    // Generate a cryptographic digest of the transaction
    const digest = new Uint8Array(QubicConstants.DIGEST_LENGTH);

    // Generate the public key from the private key
    const publicKey = schnorrq.generatePublicKey(privateKey);

    // Get the transaction data and offset
    let data = transaction.getData();
    let offset = transaction.getOffset();

    // Create a copy of the transaction data to sign
    const toSign = data.slice(0, offset);

    // Sign the transaction using the private key and the digest
    K12(toSign, digest, QubicConstants.DIGEST_LENGTH);

    // Sign the transaction using the SchnorrQ signature scheme
    const signature = schnorrq.sign(privateKey, publicKey, digest);

    // Append the signature to the transaction data
    data.set(signature, offset);

    // Generate a cryptographic digest of the signed transaction
    offset += QubicConstants.SIGNATURE_LENGTH;

    // Compute the digest of the signed transaction
    const signedTransaction = data.slice(0, offset);

    // Return the signed transaction
    return signedTransaction;
  }

  /**
   * Broadcast a transaction.
   *
   * @param {string} encodedTransaction The encoded transaction to be broadcast.
   * @returns {Promise<IBroadcastTransactionResponse | null>} A promise that resolves to the broadcast transaction response, or null if an error occurred.
   */
  async broadcastTransaction(
    encodedTransaction: string,
  ): Promise<IBroadcastTransactionResponse | null> {
    try {
      return await this.httpClient.call<IBroadcastTransactionResponse>(
        `/${this.version}/broadcast-transaction`,
        "POST",
        { encodedTransaction },
      );
    } catch (error) {
      this.logger.error("Error broadcast transaction:", error);
      return null;
    }
  }
}
