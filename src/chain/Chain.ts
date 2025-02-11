import { HttpClient } from "../providers/HttpClient";
import { QubicProvider } from "../providers/QubicProvider";
import { IChainGetLatestTick, IQubicProviderOptions } from "../types";

export class Chain {
  private readonly httpClient: HttpClient;
  private readonly providerOptions: IQubicProviderOptions

  constructor(provider: QubicProvider) {
    this.providerOptions = provider.getProvider();
    this.httpClient = new HttpClient(this.providerOptions.providerUrl);
  }

  /**
   * Retrieves the latest tick of the chain.
   *
   * @returns {Promise<number | null>} The latest tick of the chain, or null if an error occurred.
   */
  async getLatestTick(): Promise<number | null> {
    try {
      const response: IChainGetLatestTick = await this.httpClient.call(
        `/v${this.providerOptions.version}/latestTick`,
        "GET"
      );
      return response?.latestTick;
    } catch (error) {
      console.error("Error fetching latest tick:", error);
      return null;
    }
  }

  /**
   * Fetches the tick data for the specified tick.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/tick-data` endpoint
   * to retrieve the tick data for the given tick number.
   *
   * @param {string} tickNumber - The tick number for which to fetch the tick data.
   * @returns {Promise<any>} A promise that resolves to the tick data.
   */
  async getTickData(tickNumber: string): Promise<any> {
    try {
      return await this.httpClient.call(
        `/v${this.providerOptions.version}/ticks/${tickNumber}/tick-data`,
        "GET"
      );
    } catch (error) {}
  }

  /**
   * Fetches the RPC status.
   *
   * This method sends a GET request to the `/status` endpoint
   * to retrieve the RPC status.
   *
   * @returns {Promise<any>} A promise that resolves to the RPC status.
   */
  async getRpcStatus(): Promise<any> {
    try {
      return await this.httpClient.call(`/status`, "GET");
    } catch (error) {
      console.error("Error fetching latest tick:", error);
    }
  }

  /**
   * Fetches the chain hash for a given tick number.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/chain-hash` endpoint
   * to retrieve the chain hash associated with the given tick number.
   *
   * @param tickNumber The tick number for which to retrieve the chain hash.
   * @returns A promise that resolves to an object containing the chain hash.
   */
  async getChainHash(tickNumber: number): Promise<any> {
    console.log(`[Mock Chain] Fetching chain hash`);
    try {
      return await this.httpClient.call(
        `/v${this.providerOptions.version}/ticks/${tickNumber}/chain-hash`,
        "GET"
      );
    } catch (error) {}
  }

  /**
   * Fetches the quorum tick data for the specified tick.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/quorum-tick-data` endpoint
   * to retrieve the quorum tick data for the given tick number.
   *
   * @param {number} tickNumber - The tick number for which to fetch the quorum tick data.
   * @returns {Promise<any>} A promise that resolves to the quorum tick data.
   */
  async getQuorumTickData(tickNumber: number): Promise<any> {
    console.log(`[Mock Chain] Fetching quorum tick data`);
    try {
      return await this.httpClient.call(
        `/v${this.providerOptions.version}/ticks/${tickNumber}/quorum-tick-data`,
        "GET"
      );
    } catch (error) {}
  }

  /**
   * Fetches the store hash for the specified tick.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/store-hash` endpoint
   * to retrieve the store hash for the given tick.
   *
   * @param {number} tickNumber - The tick number for which to fetch the store hash.
   * @returns {Promise<any>} A promise that resolves to the store hash.
   */
  async getStoreHash(tickNumber: number): Promise<any> {
    try {
      return await this.httpClient.call(
        `/v${this.providerOptions.version}/ticks/${tickNumber}/store-hash`,
        "GET"
      );
    } catch (error) {}
  }

  /**
   * Performs a health check of the Qubic network.
   *
   * @returns An object with a single property, `status`, which is either `"healthy"` or `"unhealthy"`.
   */
  async getHealthCheck(): Promise<any> {
    try {
      return await this.httpClient.call(
        `/v${this.providerOptions.version}/healthcheck`,
        "GET"
      );
    } catch (error) {}
  }

  /**
   * Fetches the list of computors for the specified epoch.
   *
   * This method sends a GET request to the `/epochs/{epoch}/computors` endpoint
   * to retrieve the computors associated with the given epoch.
   *
   * @param {number} epoch - The epoch number for which to fetch the computors.
   * @returns {Promise<any>} A promise that resolves to the computors data.
   */
  async getComputors(epoch: number): Promise<any> {
    try {
      return await this.httpClient.call(
        `/v${this.providerOptions.version}/epochs/${epoch}/computors`,
        "GET"
      );
    } catch (error) {}
  }

  /**
   * Fetches the current tick information from the chain.
   *
   * This method sends a GET request to the `/tick-info` endpoint
   * to retrieve the current tick information.
   *
   * @returns {Promise<any>} A promise that resolves to the tick info.
   */
  async getTickInfo(): Promise<any> {
    try {
      return await this.httpClient.call(
        `/v${this.providerOptions.version}/tick-info`,
        "GET"
      );
    } catch (error) {}
  }

  /**
   * Fetches the current block height from the chain.
   *
   * This method sends a GET request to the `/block-height` endpoint
   * to retrieve the current block height.
   *
   * @returns {Promise<any>} A promise that resolves to the block height.
   */
  async getBlockHeight(): Promise<any> {
    try {
      return await this.httpClient.call(`/block-height`, "GET");
    } catch (error) {}
  }

  /**
   * Fetches the latest statistics from the chain.
   *
   * This method sends a GET request to the `/block-height` endpoint
   * to retrieve the most recent statistics related to the block height.
   *
   * @returns {Promise<any>} A promise that resolves to the latest statistics.
   */
  async getLatestStats(): Promise<any> {
    try {
      return await this.httpClient.call(`/latest-stats`, "GET");
    } catch (error) {}
  }
}
