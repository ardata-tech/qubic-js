import { IQubicProviderOptions } from "./types";

export class QubicProvider {
  private readonly options: IQubicProviderOptions;

  constructor(providerOptions: IQubicProviderOptions) {
    this.options = providerOptions;
  }

  setVersion(version: number) {
    this.options.version = version;
    return this;
  }

  setProviderUrl(providerUrl: string) {
    this.options.providerUrl = providerUrl;
    return this;
  }

  getProvider(): IQubicProviderOptions {
    return this.options
  }
}