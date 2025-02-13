import { QubicProvider } from "../provider";

export class Contract {
  private provider: QubicProvider;
  private address: string;

  constructor(provider: QubicProvider, contractAddress: string) {
    this.provider = provider;
    this.address = contractAddress;
  }

  async querySmartContract(method: string, params: any[]): Promise<any> {
    console.log(`[Mock Contract] Querying smart contract method '${method}' on ${this.address}`, params);
    return `mock-result-for-${method}`;
  }
}