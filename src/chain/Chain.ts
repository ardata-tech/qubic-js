export class Chain {
  private providerUrl: string;

  constructor(providerUrl: string) {
    this.providerUrl = providerUrl;
  }

  async getBlockHeight(): Promise<number> {
    console.log(`[Mock Chain] Fetching block height`);
    return 1050000; // Mock block height
  }

  async getBlock(blockNumber: number): Promise<any> {
    console.log(`[Mock Chain] Fetching block ${blockNumber}`);
    return {
      blockNumber,
      timestamp: Date.now(),
      transactions: ["mock-tx-1", "mock-tx-2"],
    };
  }

  async getNetworkInfo(): Promise<any> {
    console.log(`[Mock Chain] Fetching network info`);
    return {
      chainId: "qubic-mainnet",
      protocolVersion: "1.0.0",
      syncStatus: "synced",
    };
  }

  async getPeerCount(): Promise<number> {
    console.log(`[Mock Chain] Fetching peer count`);
    return 8; // Mock peer count
  }

  async getGasPrice(): Promise<number> {
    console.log(`[Mock Chain] Fetching gas price`);
    return 20; // Mock gas price
  }
}
