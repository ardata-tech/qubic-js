/**
 * Transaction Structure: Each transaction consists of several key components, including the source and destination public keys,
 * the amount to be transferred, the tick (timestamp), input type, input size, and a payload. This structure ensures that all
 * necessary information is included for processing the transaction.
 */

import { Identity } from "../identity";

export class TransactionBuilder {
  private identityInstance: Identity;
  encodeTransaction: string | null = null;
  sourceKey: string = '';
  destinationKey: string = '';
  amout: number | bigint | Uint8Array = 0;
  tick: number = 0;
  inputSize: number = 0;
  inputType: number = 0;
  payload: any = null;
  id: string | null = null;

  constructor(identityInstance: Identity) {
    this.identityInstance = identityInstance;
  }

  public async setSource(sourceKey: string) {
    const isValidKey = await this.identityInstance.verifyIdentity(sourceKey);
    if (!isValidKey) {
      throw new Error("Invalid source key");
    }
    this.sourceKey = sourceKey;
    return this;
  }

  public async setDestination(destinationKey: string) {
    const isValidKey = await this.identityInstance.verifyIdentity(
      destinationKey
    );
    if (!isValidKey) {
      throw new Error("Invalid destination key");
    }
    this.destinationKey = destinationKey;
    return this;
  }

  public setAmount(amount: number | bigint | Uint8Array | undefined) {
    if (amount === undefined) {
      throw new Error("Invalid amount");
    }
    if (amount instanceof Uint8Array) {
      const view = new DataView(amount.buffer, 0);
      this.amout = view.getBigUint64(0, true);
    }
    this.amout = amount;
    return this;
  }

  public setTick(tick: number) {
    this.tick = tick;
    return this;
  }

  public setInputSize(inputSize: number) {
    this.inputSize = inputSize;
    return this;
  }

  public setPayload(payload: any) {
    this.payload = payload;
    return this;
  }

  public setInputType(inputType: number) {
    this.inputSize = inputType;
    return this;
  }

  public build() {
    return this;
  }
}
