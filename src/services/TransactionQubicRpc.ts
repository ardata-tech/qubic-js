import { HttpClient } from '../lib'
import { Endpoints } from '../constants';

export class TransactionQubicRpc {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * @description Returns the information for the given transaction id, including timestamp and transfer status.
   * @param {number} version API version.
   * @param {string} txHash Transaction hash.
   * @returns {Promise<AxiosResponse<any>>} The transaction data.
   */
  getTransaction = async (version: number, txHash: string) => {
    return await this.httpClient
      .getAxiosInstance()
      .get(
        version === 1
          ? Endpoints.GET_V1_TRANSACTIONS
          : Endpoints.GET_V2_TRANSACTIONS + `/${txHash}`
      );
  };
   
}