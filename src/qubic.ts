import { QubicProvider } from "./provider";
import { ChainModule } from "./chain";
import { TransactionModule } from "./transaction";
import { IdentityModule } from "./identity";
import { ContractModule } from "./contract";
import { Utils } from './utils';
import { IQubicProviderOptions } from "./types";

export default class Qubic {
  private provider: QubicProvider;
  public chain: ChainModule;
  public identity: IdentityModule;
  public transaction: TransactionModule;
  public contract: (address: string) => ContractModule;
  public utils = Utils;

  constructor(options: IQubicProviderOptions) {
    this.provider = new QubicProvider(options);
    this.chain = new ChainModule(this.provider);
    this.identity = new IdentityModule(this.provider);
    this.transaction = new TransactionModule(this.provider);
    this.contract = (address: string) => new ContractModule(this.provider, address);
  }
}
