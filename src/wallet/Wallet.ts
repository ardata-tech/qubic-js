import { QubicProvider } from "../providers/QubicProvider";

export class Wallet {
  private provider: QubicProvider;

  constructor(provider: QubicProvider) {
    this.provider = provider;
  }

  async getBalance(address: string): Promise<number> {
    return this.provider.getBalance(address);
  }

  async createTransaction(from: string, to: string, amount: number) {
    console.log(`[Mock Wallet] Creating transaction from ${from} to ${to}`);
    return { from, to, amount, nonce: Date.now() };
  }

  async signTransaction(tx: any): Promise<any> {
    console.log(`[Mock Wallet] Signing transaction`, tx);
    return { ...tx, signature: "mock-signature" };
  }

  async sendTransaction(signedTx: any): Promise<string> {
    return this.provider.sendTransaction(signedTx);
  }
}
