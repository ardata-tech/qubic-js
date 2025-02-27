import { QubicProvider } from "../provider";
import {
  IGetLatestTick,
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
import { QubicBase } from "../base";

export class ChainService extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
  }

  /**
   * Retrieves the latest tick of the chain.
   *
   * @returns {Promise<number | null>} The latest tick of the chain, or null if an error occurred.
   */
  async getLatestTick(): Promise<number | null> {
    try {
      const response: IGetLatestTick = await this.httpClient.call(
        `/${this.version}/latestTick`,
        "GET",
      );
      return response?.latestTick;
    } catch (error) {
      throw new Error(`Failed to fetch latest tick: ${(error as any).message}`);
    }
  }

  /**
   * Retrieves the tick data for the specified tick.
   *
   * @param {number} tickNumber The tick number for which to fetch the tick data.
   * @returns {Promise<IGetTickData | null>} A promise that resolves to the tick data, or null if an error occurred.
   */
  async getTickData(tickNumber: number): Promise<IGetTickData | null> {
    try {
      const response: IGetTickData = await this.httpClient.call(
        `/${this.version}/ticks/${tickNumber}/tick-data`,
        "GET",
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch tick data for tick number ${tickNumber}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Fetches the RPC status.
   *
   * @returns {Promise<IGetRpcStatus | null>} A promise that resolves to the RPC status.
   */
  async getRpcStatus(): Promise<IGetRpcStatus | null> {
    try {
      const response: IGetRpcStatus = await this.httpClient.call(
        `/${this.version}/status`,
        "GET",
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch RPC status: ${(error as any).message}`);
    }
  }

  /**
   * Fetches the chain hash for the given tick number.
   *
   * @param {number} tickNumber The tick number for which to fetch the chain hash.
   * @returns {Promise<IChainHash | null>} A promise that resolves to the chain hash, or null if an error occurred.
   */
  async getChainHash(tickNumber: number): Promise<IChainHash | null> {
    try {
      return await this.httpClient.call(
        `/${this.version}/ticks/${tickNumber}/chain-hash`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch chain hash for tick number ${tickNumber}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves the quorum tick data for the specified tick number.
   *
   * @param {number} tickNumber - The tick number for which to fetch the quorum tick data.
   * @returns {Promise<IGetQuorumTickData | null>} A promise that resolves to the quorum tick data, or null if an error occurred.
   */
  async getQuorumTickData(
    tickNumber: number,
  ): Promise<IGetQuorumTickData | null> {
    try {
      return await this.httpClient.call(
        `/${this.version}/ticks/${tickNumber}/quorum-tick-data`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch quorum tick data for tick number ${tickNumber}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves the store hash for the specified tick number.
   *
   * @param {number} tickNumber - The tick number for which to fetch the store hash.
   * @returns {Promise<IChainHash | null>} A promise that resolves to the store hash, or null if an error occurred.
   */
  async getStoreHash(tickNumber: number): Promise<IChainHash | null> {
    try {
      return await this.httpClient.call(
        `/${this.version}/ticks/${tickNumber}/store-hash`,
        "GET",
      );
    } catch (error: any) {
      throw new Error(
        `Failed to fetch store hash for tick number ${tickNumber}: ${error.message}`,
      );
    }
  }

  /**
   * Performs a health check for the Qubic network.
   *
   * @returns {Promise<IGetHealthCheck | null>} A promise that resolves to the health check result, or null if an error occurred.
   */
  async getHealthCheck(): Promise<IGetHealthCheck | null> {
    try {
      return await this.httpClient.call(`/${this.version}/healthcheck`, "GET");
    } catch (error) {
      throw new Error(
        `Failed to perform health check: ${(error as any).message}`,
      );
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
        `/${this.version}/epochs/${epoch}/computors`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch computors for epoch ${epoch}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Fetches the current tick information from the chain.
   *
   * @returns {Promise<IGetTickInfo | null>} A promise that resolves to the tick info.
   */
  async getTickInfo(): Promise<IGetTickInfo | null> {
    try {
      return await this.httpClient.call(`/${this.version}/tick-info`, "GET");
    } catch (error) {
      throw new Error(`Failed to fetch tick info: ${(error as any).message}`);
    }
  }

  /**
   * Fetches the current block height from the chain.
   *
   * @returns {Promise<IGetBlockHeight | null>} A promise that resolves to the block height.
   */
  async getBlockHeight(): Promise<IGetBlockHeight | null> {
    try {
      return await this.httpClient.call(`/${this.version}/block-height`, "GET");
    } catch (error) {
      throw new Error(
        `Failed to fetch block height: ${(error as any).message}`,
      );
    }
  }

  /**
   * Fetches the latest statistics from the chain.
   *
   * @returns {Promise<any>} A promise that resolves to the latest statistics.
   */
  async getLatestStats(): Promise<IGetLatestStats | null> {
    try {
      return await this.httpClient.call(`/${this.version}/latest-stats`, "GET");
    } catch (error) {
      throw new Error(
        `Failed to fetch latest stats: ${(error as any).message}`,
      );
    }
  }
}
