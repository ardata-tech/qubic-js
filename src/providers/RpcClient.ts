import { HttpClient } from "./HttpClient";

export class RpcClient {
  private httpClient: HttpClient;

  constructor(private providerUrl: string) {
    this.httpClient = new HttpClient(providerUrl);
  }

  async call<T>(method: string, params: any[]): Promise<T> {
    const payload = { jsonrpc: "2.0", method, params, id: 1 };
    return this.httpClient.post<T>("/", payload);
  }
}
