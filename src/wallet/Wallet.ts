import { QubicProvider } from "../providers/QubicProvider";

export class Wallet {
  private provider: QubicProvider;

  constructor(provider: QubicProvider) {
    this.provider = provider;
  }

  async getBalance(address: string): Promise<number> {
    console.log(`[Mock Wallet] Fetching balance for ${address}`);
    return 1000;
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
    console.log(`[Mock Wallet] Sending transaction`, signedTx);
    return "mock-tx-hash";
  }

  async broadcastTransaction(tx: any): Promise<string> {
    console.log(`[Mock Wallet] Broadcasting transaction`, tx);
    return "mock-broadcast-tx-hash";
  }

  // ... other methods ...
}