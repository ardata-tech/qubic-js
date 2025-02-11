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

  async broadcastTransaction(tx: any): Promise<string> {
    console.log(`[Mock Wallet] Broadcasting transaction`, tx);
    return "mock-broadcast-tx-hash";
  }

  async getApprovedTransactionsForTick(tick: string): Promise<any[]> {
    console.log(`[Mock Wallet] Fetching approved transactions for tick ${tick}`);
    return [{ tx: "mock-tx-1" }, { tx: "mock-tx-2" }];
  }

  async getTransactionStatus(txHash: string): Promise<string> {
    console.log(`[Mock Wallet] Fetching transaction status for ${txHash}`);
    return "mock-transaction-status";
  }

  async getTransaction(txHash: string): Promise<any> {
    console.log(`[Mock Wallet] Fetching transaction ${txHash}`);
    return { txHash, status: "mock-status" };
  }

  async getTransferTransactionsPerTick(tick: string): Promise<any[]> {
    console.log(`[Mock Wallet] Fetching transfer transactions for tick ${tick}`);
    return [{ tx: "mock-transfer-tx-1" }, { tx: "mock-transfer-tx-2" }];
  }

  async getIssuedAssets(address: string): Promise<any[]> {
    console.log(`[Mock Wallet] Fetching issued assets for ${address}`);
    return [{ asset: "mock-asset-1" }, { asset: "mock-asset-2" }];
  }

  async getOwnedAssets(address: string): Promise<any[]> {
    console.log(`[Mock Wallet] Fetching owned assets for ${address}`);
    return [{ asset: "mock-owned-asset-1" }, { asset: "mock-owned-asset-2" }];
  }

  async getPossessedAssets(address: string): Promise<any[]> {
    console.log(`[Mock Wallet] Fetching possessed assets for ${address}`);
    return [{ asset: "mock-possessed-asset-1" }, { asset: "mock-possessed-asset-2" }];
  }
}