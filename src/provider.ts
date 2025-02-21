import { IQubicProviderOptions } from "./types";

export class QubicProvider {
  private readonly options: IQubicProviderOptions;

  constructor(providerOptions: IQubicProviderOptions) {
    this.options = providerOptions;
  }

  getProviderOptions(): IQubicProviderOptions {
    return this.options;
  }
}
