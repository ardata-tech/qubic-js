import { QubicProvider } from "./providers/QubicProvider";
import { Wallet } from "./wallet/Wallet";
import { Contract } from "./contract/Contract";
import { Utils } from './utils/Utils';

class Qubic {
  public provider: QubicProvider;
  public wallet: Wallet;
  public contract: (address: string) => Contract;
  public utils = Utils;

  constructor(providerUrl: string) {
    this.provider = new QubicProvider(providerUrl);
    this.wallet = new Wallet(this.provider);
    this.contract = (address: string) => new Contract(this.provider, address);
  }

  setProvider(providerUrl: string) {
    this.provider = new QubicProvider(providerUrl);
    this.wallet = new Wallet(this.provider);
  }
}

export default Qubic;