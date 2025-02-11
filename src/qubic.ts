import { QubicProvider } from "./providers/QubicProvider";
import { Wallet } from "./wallet";
import { QubicContract } from "./contract";
import * as utils from "./utils";

class Qubic {
  public provider: QubicProvider;
  public wallet: Wallet;
  public contract: (address: string) => QubicContract;
  public utils = utils;

  constructor(providerUrl: string) {
    this.provider = new QubicProvider(providerUrl);
    this.wallet = new Wallet(this.provider);
    this.contract = (address: string) => new QubicContract(this.provider, address);
  }

  setProvider(providerUrl: string) {
    this.provider = new QubicProvider(providerUrl);
    this.wallet = new Wallet(this.provider);
  }
}

export default Qubic;
