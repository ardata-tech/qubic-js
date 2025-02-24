import { QubicProvider } from "./provider";
import { ChainService } from "./chain";
import { TransactionService } from "./transaction";
import { IdentityService } from "./identity";
import { ContractService } from "./contract";
import { UtilityService } from "./utils";
import { QxService } from "./qx";
import { IQubicProviderOptions } from "./types";

export default class QubicCore {
  private provider: QubicProvider;
  public chain: ChainService;
  public identity: IdentityService;
  public transaction: TransactionService;
  public contract: (address: string) => ContractService;
  public utils = UtilityService;
  public qx: QxService;

  constructor(options: IQubicProviderOptions) {
    this.provider = new QubicProvider(options);
    this.chain = new ChainService(this.provider);
    this.identity = new IdentityService(this.provider);
    this.transaction = new TransactionService(this.provider);
    this.contract = (address: string) =>
      new ContractService(this.provider, address);
    this.qx = new QxService(this.provider);
  }
}
