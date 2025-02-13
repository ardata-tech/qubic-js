import { QubicProvider } from "../provider";

export class Wallet {
  private provider: QubicProvider;

  constructor(provider: QubicProvider) {
    this.provider = provider;
  }

  async getBalance(address: string): Promise<number> {
    return 1000;
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

  async broadcastTransaction(tx: any): Promise<string> {
    return "mock-broadcast-tx-hash";
  }
}