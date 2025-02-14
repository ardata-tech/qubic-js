import { BaseClass } from "../base-class";
import { QubicProvider } from "../provider";
import {
  IPostQuerySmartContractBody,
  IPostQuerySmartContractResponse,
} from "../types";

export class Contract extends BaseClass {
  private address: string;

  constructor(provider: QubicProvider, contractAddress: string) {
    super(provider);
    this.address = contractAddress;
  }

  async querySmartContract(
    body: IPostQuerySmartContractBody
  ): Promise<IPostQuerySmartContractResponse | null> {
    try {
      return await this.httpClient.call<IPostQuerySmartContractResponse>(
        `/${this.version}/querySmartContract`,
        "POST",
        body
      );
    } catch (error) {
      this.logger.error("Error fetching latest tick:", error);
      return null;
    }
  }
}
