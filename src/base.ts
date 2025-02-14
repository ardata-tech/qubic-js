import { HttpClient } from "./http";
import { logger as _logger } from "./logger";
import { Logger } from "winston";
import { QubicProvider } from "./provider";
import { IQubicProviderOptions } from "./types";

export class QubicBase {
  httpClient: HttpClient;
  providerOptions: IQubicProviderOptions;
  version: string;
  logger: Logger;

  constructor(provider: QubicProvider) {
    this.providerOptions = provider.getProviderOptions();
    this.version = `v${this.providerOptions.version}`;
    this.httpClient = new HttpClient(this.providerOptions.providerUrl);
    this.logger = _logger;
  }
}
