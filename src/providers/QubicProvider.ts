export class QubicProvider {
  private providerUrl: string;

  constructor(providerUrl: string) {
    this.providerUrl = providerUrl;
  }

  async getBalance(address: string): Promise<number> {
    console.log(`[Mock Provider] Fetching balance for ${address}`);
    return 1000; // Mock balance
  }

  async sendTransaction(tx: any): Promise<string> {
    console.log(`[Mock Provider] Sending transaction`, tx);
    return "mock-tx-hash";
  }
}
