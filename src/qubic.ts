import { QubicProvider } from "./provider";
import { Chain } from "./chain";
import { Identity } from "./identity";
import { Contract } from "./contract";
import { Utils } from './utils';
import { IQubicProviderOptions } from "./types";

export default class Qubic {
  private provider: QubicProvider;
  public chain: Chain;
  public identity: Identity;
  public contract: (address: string) => Contract;
  public utils = Utils;

  constructor(options: IQubicProviderOptions) {
    this.provider = new QubicProvider(options);
    this.chain = new Chain(this.provider);
    this.identity = new Identity(this.provider);
    this.contract = (address: string) => new Contract(this.provider, address);
  }
}
