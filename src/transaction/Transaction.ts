import { QubicBase } from "../base";
import { QubicConstants } from "../constants";
import { QubicProvider } from "../provider";
import crypto from "../crypto";
import { TransactionBuilder } from "./TransactionBuilder";
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
    console.log("broadcastTransaction encodedTransaction:", encodedTransaction);
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

  async createTransaction(
    from: string,
    to: string,
    amount: number,
    seed: string
  ): Promise<{ id: string; base64EncodedTransaction:string }> {
    const tb = new TransactionBuilder()
      .setSourceBytes(this.getIdentityBytes(from))
      .setDestinationBytes(this.getIdentityBytes(to))
      .setAmount(amount)
      .build();

    const { signedData, digest, signature } = await this.signDigest(
      seed,
      tb.getDataPacket(),
      tb.getDataOffset()
    );
    const id = await this.getIdentity(signature, true);
    tb.setBuiltData(signedData);
    tb.setDigest(digest);
    tb.setSignature(signature);

    return {
      id,
      base64EncodedTransaction: this.encodeTransactionToBase64(signedData),
    };
  }

  async signTransaction(tx: any): Promise<any> {
    return { ...tx, signature: "mock-signature" };
  }

  async sendTransaction(signedTx: any): Promise<string> {
    return "mock-tx-hash";
  }

  private encodeTransactionToBase64(transaction: Uint8Array) {
    const byteArray: Uint8Array = new Uint8Array(transaction);
    const str = String.fromCharCode.apply(null, Array.from(byteArray));
    return btoa(str);
  }

  public async signDigest(
    seed: string,
    packet: Uint8Array,
    offset: number
  ): Promise<any> {
    const { schnorrq, K12 } = await crypto;
    const privateKey = this.generatePrivateKey(seed, 0, K12);
    const publicKey = schnorrq.generatePublicKey(privateKey);
    const digest = new Uint8Array(QubicConstants.DIGEST_LENGTH);

    const toSign = packet.slice(0, offset);
    K12(toSign, digest, QubicConstants.DIGEST_LENGTH);
    const signature = schnorrq.sign(privateKey, publicKey, digest);
    packet.set(signature, offset);
    offset += QubicConstants.SIGNATURE_LENGTH;
    const signedData = packet.slice(0, offset);
    K12(signedData, digest, QubicConstants.DIGEST_LENGTH);

    return {
      signedData: signedData,
      digest: digest,
      signature: signature,
    };
  }
}
