import { QubicProvider } from "../provider";
import {
  IQxAssetAskOrders,
  IQxAssetBidOrders,
  IQxEntityAskOrders,
  IQxEntityBidOrders,
  IQxFees,
} from "../types";
import { QubicBase } from "../base";

export class QxService extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
  }

  /**
   * Retrieves ask orders for a specific asset and issuer.
   *
   * @param {string} assetName - The name of the asset.
   * @param {string} issuerId - The issuer's ID.
   * @param {string} offset - The offset for pagination.
   * @returns {Promise<IQxAssetAskOrders>} A promise that resolves to asset ask orders.
   */
  async getAskOrders(
    assetName: string,
    issuerId: string,
    offset: string,
  ): Promise<IQxAssetAskOrders> {
    const url = `/${this.version}/qx/getAskOrders?assetName=${encodeURIComponent(assetName)}&issuerId=${encodeURIComponent(issuerId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxAssetAskOrders = await this.httpClient.call(
        url,
        "GET",
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch ask orders for asset ${assetName} and issuer ${issuerId}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves bid orders for a specific asset and issuer.
   *
   * @param {string} assetName - The name of the asset.
   * @param {string} issuerId - The issuer's ID.
   * @param {string} offset - The offset for pagination.
   * @returns {Promise<IQxAssetBidOrders>} A promise that resolves to asset bid orders.
   */
  async getAssetBidOrders(
    assetName: string,
    issuerId: string,
    offset: string,
  ): Promise<IQxAssetBidOrders> {
    const url = `/${this.version}/qx/getAssetBidOrders?assetName=${encodeURIComponent(assetName)}&issuerId=${encodeURIComponent(issuerId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxAssetBidOrders = await this.httpClient.call(
        url,
        "GET",
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch bid orders for asset ${assetName} and issuer ${issuerId}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves ask orders for a specific entity.
   *
   * @param {string} entityId - The entity's ID.
   * @param {string} offset - The offset for pagination.
   * @returns {Promise<IQxEntityAskOrders>} A promise that resolves to entity ask orders.
   */
  async getEntityAskOrders(
    entityId: string,
    offset: string,
  ): Promise<IQxEntityAskOrders> {
    const url = `/${this.version}/qx/getEntityAskOrders?entityId=${encodeURIComponent(entityId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxEntityAskOrders = await this.httpClient.call(
        url,
        "GET",
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch ask orders for entity ${entityId}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves bid orders for a specific entity.
   *
   * @param {string} entityId - The entity's ID.
   * @param {string} offset - The offset for pagination.
   * @returns {Promise<IQxEntityBidOrders>} A promise that resolves to entity bid orders.
   */
  async getEntityBidOrders(
    entityId: string,
    offset: string,
  ): Promise<IQxEntityBidOrders> {
    const url = `/${this.version}/qx/getEntityBidOrders?entityId=${encodeURIComponent(entityId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxEntityBidOrders = await this.httpClient.call(
        url,
        "GET",
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch bid orders for entity ${entityId}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves the fees associated with Qx transactions.
   *
   * @returns {Promise<IQxFees>} A promise that resolves to the Qx fees.
   */
  async getFees(): Promise<IQxFees> {
    const url = `/${this.version}/qx/getFees`;
    try {
      const response: IQxFees = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch Qx fees: ${(error as any).message}`);
    }
  }
}
