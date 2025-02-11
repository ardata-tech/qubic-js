import { QubicProvider } from "./providers/QubicProvider";
import { Chain } from "./chain";
import { Wallet } from "./wallet";
import { Contract } from "./contract";
import { Utils } from './utils';

class Qubic {
  public provider: QubicProvider;
  public chain: Chain;
  public wallet: Wallet;
  public contract: (address: string) => Contract;
  public utils = Utils;

  constructor(providerUrl: string) {
    this.provider = new QubicProvider(providerUrl);
    this.chain = new Chain(this.provider);
    this.wallet = new Wallet(this.provider);
    this.contract = (address: string) => new Contract(this.provider, address);
  }

  setProvider(providerUrl: string) {
    this.provider = new QubicProvider(providerUrl);
    this.chain = new Chain(this.provider);
    this.wallet = new Wallet(this.provider);
  }
}

export default Qubic;