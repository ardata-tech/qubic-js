import { QubicProvider } from "./provider";
import { Chain } from "./chain";
import { Wallet } from "./wallet";
import { Contract } from "./contract";
import { Utils } from './utils';
import { IQubicProviderOptions } from "./types";

class Qubic {
  private provider: QubicProvider;
  public chain: Chain;
  public wallet: Wallet;
  public contract: (address: string) => Contract;
  public utils = Utils;

  constructor(options: IQubicProviderOptions) {
    this.provider = new QubicProvider(options);
    this.chain = new Chain(this.provider);
    this.wallet = new Wallet(this.provider);
    this.contract = (address: string) => new Contract(this.provider, address);
  }
}

export default Qubic;