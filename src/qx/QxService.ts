import { QubicProvider } from "../provider";
import { IQxAssetAskOrders, IQxAssetBidOrders, IQxEntityAskOrders, IQxEntityBidOrders, IQxFees } from "../types";
import { QubicBase } from "../base";

export class QxService extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
  }

  async getAskOrders(assetName: string, issuerId: string, offset: string): Promise<IQxAssetAskOrders | null> {
    const url = `/${this.version}/qx/getAskOrders?assetName=${encodeURIComponent(assetName)}&issuerId=${encodeURIComponent(issuerId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxAssetAskOrders = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      this.logger.error("Error fetching ask orders:", error);
      return null;
    }
  }

  async getAssetBidOrders(assetName: string, issuerId: string, offset: string): Promise<IQxAssetBidOrders | null> {
    const url = `/${this.version}/qx/getAssetBidOrders?assetName=${encodeURIComponent(assetName)}&issuerId=${encodeURIComponent(issuerId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxAssetBidOrders = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      this.logger.error("Error fetching asset bid orders:", error);
      return null;
    }
  }

  async getEntityAskOrders(entityId: string, offset: string): Promise<IQxEntityAskOrders | null> {
    const url = `/${this.version}/qx/getEntityAskOrders?entityId=${encodeURIComponent(entityId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxEntityAskOrders = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      this.logger.error("Error fetching entity ask orders:", error);
      return null;
    }
  }

  async getEntityBidOrders(entityId: string, offset: string): Promise<IQxEntityBidOrders | null> {
    const url = `/${this.version}/qx/getEntityBidOrders?entityId=${encodeURIComponent(entityId)}&offset=${BigInt(offset).toString()}`;
    try {
      const response: IQxEntityBidOrders = await this.httpClient.call(url, "GET");
      return response;
    }
    catch (error) {
      this.logger.error("Error fetching entity bid orders:", error);
      return null;
    }
  }

  async getFees(): Promise<IQxFees | null> {
    const url = `/${this.version}/qx/getFees`;
    try {
      const response: IQxFees = await this.httpClient.call(url, "GET");
      return response;
    } catch (error) {
      this.logger.error("Error fetching fees:", error);
      return null;
    }
  }
}