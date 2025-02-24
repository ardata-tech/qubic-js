import { QubicProvider } from "../provider";
import { IQxAssetAskOrders, IQxAssetBidOrders, IQxEntityAskOrders, IQxEntityBidOrders, IQxFees } from "../types";
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
   * @returns {Promise<IQxAssetAskOrders | null>} A promise that resolves to asset ask orders or null if an error occurs.
   */
  async getAskOrders(assetName: string, issuerId: string, offset: string): Promise<IQxAssetAskOrders | null> {
    const url = `/${this.version}/qx/getAskOrders?assetName=${encodeURIComponent(assetName)}&issuerId=${encodeURIComponent(issuerId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxAssetAskOrders = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      return null;
    }
  }

  /**
   * Retrieves bid orders for a specific asset and issuer.
   *
   * @param {string} assetName - The name of the asset.
   * @param {string} issuerId - The issuer's ID.
   * @param {string} offset - The offset for pagination.
   * @returns {Promise<IQxAssetBidOrders | null>} A promise that resolves to asset bid orders or null if an error occurs.
   */
  async getAssetBidOrders(assetName: string, issuerId: string, offset: string): Promise<IQxAssetBidOrders | null> {
    const url = `/${this.version}/qx/getAssetBidOrders?assetName=${encodeURIComponent(assetName)}&issuerId=${encodeURIComponent(issuerId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxAssetBidOrders = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      return null;
    }
  }

  /**
   * Retrieves ask orders for a specific entity.
   *
   * @param {string} entityId - The entity's ID.
   * @param {string} offset - The offset for pagination.
   * @returns {Promise<IQxEntityAskOrders | null>} A promise that resolves to entity ask orders or null if an error occurs.
   */
  async getEntityAskOrders(entityId: string, offset: string): Promise<IQxEntityAskOrders | null> {
    const url = `/${this.version}/qx/getEntityAskOrders?entityId=${encodeURIComponent(entityId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxEntityAskOrders = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      return null;
    }
  }

  /**
   * Retrieves bid orders for a specific entity.
   *
   * @param {string} entityId - The entity's ID.
   * @param {string} offset - The offset for pagination.
   * @returns {Promise<IQxEntityBidOrders | null>} A promise that resolves to entity bid orders or null if an error occurs.
   */
  async getEntityBidOrders(entityId: string, offset: string): Promise<IQxEntityBidOrders | null> {
    const url = `/${this.version}/qx/getEntityBidOrders?entityId=${encodeURIComponent(entityId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxEntityBidOrders = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      return null;
    }
  }

  /**
   * Retrieves the fees associated with Qx transactions.
   *
   * @returns {Promise<IQxFees | null>} A promise that resolves to the Qx fees or null if an error occurs.
   */
  async getFees(): Promise<IQxFees | null> {
    const url = `/${this.version}/qx/getFees`;
    try {
      const response: IQxFees = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      return null;
    }
  }
}
