/**
 * Transaction Structure: Each transaction consists of several key components, including the source and destination public keys,
 * the amount to be transferred, the tick (timestamp), input type, input size, and a payload. This structure ensures that all
 * necessary information is included for processing the transaction.
 */

import { Identity } from "../identity";

export class TransactionBuilder {
  private identityInstance: Identity;
  
  sourceKey: string | null = null;
  destinationKey: string | null = null;
  amout: number = 0;
  tick: number = 0;
  inputSize: number = 0;
  inputType: number = 0;
  payload: any = null;

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

  public setDestination(destinationKey: string) {
    this.destinationKey = destinationKey;
    return this;
  }

  public setAmount(amount: number) {
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
