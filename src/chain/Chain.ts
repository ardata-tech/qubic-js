import { HttpClient } from "../providers/HttpClient";
import { QubicProvider } from "../providers/QubicProvider";
import {
  IGetLatestTick,
  IQubicProviderOptions,
  IGetTickData,
  IGetRpcStatus,
  IChainHash,
  IGetQuorumTickData,
  IGetHealthCheck,
  IGetComputors,
  IGetTickInfo,
  IGetBlockHeight,
  IGetLatestStats,
} from "../types";
import QubicLogger from "../utils/QubicLogger";

export class Chain {
  private readonly httpClient: HttpClient;
  private readonly providerOptions: IQubicProviderOptions;
  private readonly apiVersion: string = "v1";

  constructor(provider: QubicProvider) {
    this.providerOptions = provider.getProvider();
    this.apiVersion = `v${this.providerOptions.version}`;
    this.httpClient = new HttpClient(this.providerOptions.providerUrl);
  }

  /**
   * Retrieves the latest tick of the chain.
   *
   * @returns {Promise<number | null>} The latest tick of the chain, or null if an error occurred.
   */
  async getLatestTick(): Promise<number | null> {
    try {
      const response: IGetLatestTick = await this.httpClient.call(
        `/${this.apiVersion}/latestTick`,
        "GET"
      );
      return response?.latestTick;
    } catch (error) {
      QubicLogger.error("Error fetching latest tick:", error);
      return null;
    }
  }

  /**
   * Retrieves the tick data for the specified tick.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/tick-data` endpoint
   * to retrieve the tick data for the given tick number.
   *
   * @param {number} tickNumber The tick number for which to fetch the tick data.
   * @returns {Promise<IGetTickData | null>} A promise that resolves to the tick data, or null if an error occurred.
   */
  async getTickData(tickNumber: number): Promise<IGetTickData | null> {
    try {
      const response: IGetTickData = await this.httpClient.call(
        `/${this.apiVersion}/ticks/${tickNumber}/tick-data`,
        "GET"
      );
      return response;
    } catch (error) {
      QubicLogger.error("Error fetching tick data:", error);
      return null;
    }
  }

  /**
   * Fetches the RPC status.
   *
   * This method sends a GET request to the `/status` endpoint
   * to retrieve the RPC status.
   *
   * @returns {Promise<any>} A promise that resolves to the RPC status.
   */
  async getRpcStatus(): Promise<IGetRpcStatus | null> {
    try {
      const response: IGetRpcStatus = await this.httpClient.call(
        `/${this.apiVersion}/status`,
        "GET"
      );
      return response;
    } catch (error) {
      QubicLogger.error("Error fetching RPC status:", error);
      return null;
    }
  }

  /**
   * Fetches the chain hash for the given tick number.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/chain-hash` endpoint
   * to retrieve the chain hash for the given tick number.
   *
   * @param {number} tickNumber The tick number for which to fetch the chain hash.
   * @returns {Promise<IGetChainHash | null>} A promise that resolves to the chain hash, or null if an error occurred.
   */
  async getChainHash(tickNumber: number): Promise<IChainHash | null> {
    try {
      return await this.httpClient.call(
        `/${this.apiVersion}/ticks/${tickNumber}/chain-hash`,
        "GET"
      );
    } catch (error) {
      QubicLogger.error("Error fetching chain hash:", error);
      return null;
    }
  }

  /**
   * Retrieves the quorum tick data for the specified tick number.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/quorum-tick-data` endpoint
   * to fetch the quorum tick data associated with the given tick number.
   *
   * @param {number} tickNumber - The tick number for which to fetch the quorum tick data.
   * @returns {Promise<IGetQuorumTickData | null>} A promise that resolves to the quorum tick data, or null if an error occurred.
   */

  async getQuorumTickData(
    tickNumber: number
  ): Promise<IGetQuorumTickData | null> {
    try {
      return await this.httpClient.call(
        `/${this.apiVersion}/ticks/${tickNumber}/quorum-tick-data`,
        "GET"
      );
    } catch (error) {
      QubicLogger.error("Error fetching quorum tick data:", error);
      return null;
    }
  }

  /**
   * Retrieves the store hash for the specified tick number.
   *
   * This method sends a GET request to the `/ticks/{tickNumber}/store-hash` endpoint
   * to retrieve the store hash for the given tick number.
   *
   * @param {number} tickNumber - The tick number for which to fetch the store hash.
   * @returns {Promise<IGetChainHash | null>} A promise that resolves to the store hash, or null if an error occurred.
   */
  async getStoreHash(tickNumber: number): Promise<IChainHash | null> {
    try {
      return await this.httpClient.call(`/${this.apiVersion}/ticks/${tickNumber}/store-hash`, "GET");
    } catch (error: any) {
      QubicLogger.error(error);
      return null;
    }
  }

  /**
   * Performs a health check for the Qubic network.
   *
   * This method sends a GET request to the `/healthcheck` endpoint to check the
   * health of the Qubic network.
   *
   * @returns {Promise<IGetHealthCheck | null>} A promise that resolves to the health check result, or null if an error occurred.
   */
  async getHealthCheck(): Promise<IGetHealthCheck | null> {
    try {
      return await this.httpClient.call(
        `/${this.apiVersion}/healthcheck`,
        "GET"
      );
    } catch (error) {
      QubicLogger.error("Error fetching health check:", error);
      return null;
    }
  }

  /**
   * Fetches the list of computors for the specified epoch.
   *
   * @param {number} epoch The epoch for which to fetch the computors.
   * @returns {Promise<IGetComputors | null>} A promise that resolves to the list of computors, or null if an error occurred.
   */
  async getComputors(epoch: number): Promise<IGetComputors | null> {
    try {
      return await this.httpClient.call(
        `/${this.apiVersion}/epochs/${epoch}/computors`,
        "GET"
      );
    } catch (error) {
      QubicLogger.error("Error fetching computors:", error);
      return null;
    }
  }

  /**
   * Fetches the current tick information from the chain.
   *
   * This method sends a GET request to the `/tick-info` endpoint
   * to retrieve the current tick information.
   *
   * @returns {Promise<IGetTickInfo | null>} A promise that resolves to the tick info.
   */
  async getTickInfo(): Promise<IGetTickInfo | null> {
    try {
      return await this.httpClient.call(`/${this.apiVersion}/tick-info`, "GET");
    } catch (error) {
      QubicLogger.error("Error fetching tick info:", error);
      return null;
    }
  }

  /**
   * Fetches the current block height from the chain.
   *
   * This method sends a GET request to the `/block-height` endpoint
   * to retrieve the current block height.
   *
   * @returns {Promise<IGetBlockHeight | null>} A promise that resolves to the block height.
   */
  async getBlockHeight(): Promise<IGetBlockHeight | null> {
    try {
      return await this.httpClient.call(
        `/${this.apiVersion}/block-height`,
        "GET"
      );
    } catch (error) {
      QubicLogger.error("Error fetching block height:", error);
      return null;
    }
  }

  /**
   * Fetches the latest statistics from the chain.
   *
   * This method sends a GET request to the `/block-height` endpoint
   * to retrieve the most recent statistics related to the block height.
   *
   * @returns {Promise<any>} A promise that resolves to the latest statistics.
   */
  async getLatestStats(): Promise<IGetLatestStats | null> {
    try {
      return await this.httpClient.call(
        `/${this.apiVersion}/latest-stats`,
        "GET"
      );
    } catch (error) {
      QubicLogger.error("Error fetching latest stats:", error);
      return null;
    }
  }
}
