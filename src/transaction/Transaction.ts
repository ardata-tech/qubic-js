import { QubicBase } from "../base";
import { QubicConstants } from "../constants";
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
    sourcePublicKey: string,
    signSeed: string,
    action: "SELL" | "BUY" | "CANCEL_SELL" | "CANCEL_BUY"
  ) {
    switch (action) {
      case "SELL":
        break;
      case "BUY":
        break;
      case "CANCEL_SELL":
        break;
      case "CANCEL_BUY":
        break;
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

  private getPackageData(value: bigint): Uint8Array {
    let buffer = new ArrayBuffer(8);
    let dataview = new DataView(buffer);
    dataview.setBigInt64(0, value, true);
    return new Uint8Array(buffer);
  }

  private encodeTransactionToBase64(transaction: Uint8Array) {
    //todo:
    //const byteArray = new Uint8Array(transaction);
    //throwing issue please fix this

    const byteArray: any = new Uint8Array(transaction);
    const str = String.fromCharCode.apply(null, byteArray);
    return btoa(str);
  }

  private getTransactionByteSize() {
    return (
      this.identityInstance.getIdentityBytes(this.sourceKey).length +
      this.identityInstance.getIdentityBytes(this.destinationKey).length +
      8 + // amount
      4 + // tick
      2 + // inputType
      2 + // inputSize
      this.inputSize
      //this.signature.getPackageSize()
    );
  }

  /**
   *
   * TODO:
   * need modify it base on the current code
   */
  private signAndDigest(seed: string): Promise<{
    signedData: Uint8Array;
    digest: Uint8Array;
    signature: Uint8Array;
  }> {
    return crypto.then(({ schnorrq, K12 }) => {
      const keyHelper = new KeyHelper();

      const privateKey = keyHelper.privateKey(seed, 0, K12);
      const publicKey = keyHelper.createPublicKey(privateKey, schnorrq, K12);

      const digest = new Uint8Array(QubicConstants.DIGEST_LENGTH);
      const toSign = this.packet.slice(0, this.offset);

      K12(toSign, digest, QubicDefinitions.DIGEST_LENGTH);
      const signature = schnorrq.sign(privateKey, publicKey, digest);

      this.packet.set(signature, this.offset);
      this.offset += QubicConstants.SIGNATURE_LENGTH;

      const signedData = this.packet.slice(0, this.offset);
      K12(signedData, digest, QubicConstants.DIGEST_LENGTH);

      return {
        signedData: signedData,
        digest: digest,
        signature: signature,
      };
    });
  }

  /**
   *
   * TODO:
   * need modify it base on the current code
   */
  private sign(seed: string): Promise<Uint8Array> {
    return crypto.then(({ schnorrq, K12 }) => {
      const keyHelper = new KeyHelper();

      const privateKey = keyHelper.privateKey(seed, 0, K12);
      const publicKey = keyHelper.createPublicKey(privateKey, schnorrq, K12);

      const digest = new Uint8Array(QubicDefinitions.DIGEST_LENGTH);
      const toSign = this.packet.slice(0, this.offset);

      K12(toSign, digest, QubicDefinitions.DIGEST_LENGTH);
      const signatur = schnorrq.sign(privateKey, publicKey, digest);

      this.packet.set(signatur, this.offset);
      this.offset += QubicDefinitions.SIGNATURE_LENGTH;

      return this.packet.slice(0, this.offset);
    });
  }
}
