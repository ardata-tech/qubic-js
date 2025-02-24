import { QubicProvider } from "../provider";
import { IQxFees } from "../types";
import { QubicBase } from "../base";

export class QxService extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
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