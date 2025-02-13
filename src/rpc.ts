import { HttpClient } from "./http";

export class RpcClient {
  private readonly httpClient: HttpClient;

  constructor(providerUrl: string) {
    this.httpClient = new HttpClient(providerUrl);
  }

  async call<T>(method: string, params: any[]): Promise<T> {
    const payload = { jsonrpc: "2.0", method, params, id: 1 };
    return this.httpClient.call<T>("/", "POST", payload);
  }
}
