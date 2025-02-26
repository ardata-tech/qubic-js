import { QubicConstants } from "../constants";
import { ITransactionPayload } from "../types";

export class Transaction {
  private sourceKey: Uint8Array;
  private destinationKey: Uint8Array;
  private tick: number = 0;
  private inputSize: number = 0;
  private inputType: number = 0;
  private data: Uint8Array;
  private offset: number = 0;
  private payload: Uint8Array;
  private amount: Uint8Array;
  private signature: Uint8Array;
  private builtData: Uint8Array;
  private digest: Uint8Array;

  constructor() {
    this.data = new Uint8Array(0);
    this.sourceKey = new Uint8Array(0);
    this.destinationKey = new Uint8Array(0);
    this.amount = new Uint8Array(0);
    this.builtData = new Uint8Array(0);
    this.digest = new Uint8Array(0);
    this.payload = new Uint8Array(0);
    this.signature = new Uint8Array(QubicConstants.SIGNATURE_LENGTH).fill(0);
  }

  public setSourceBytes(sourceBytes: Uint8Array) {
    this.sourceKey = sourceBytes;
    return this;
  }

  public setDestinationBytes(destinationKey: Uint8Array) {
    this.destinationKey = destinationKey;
    return this;
  }

  public setAmount(amount: number | bigint | Uint8Array) {
    let amountUint8Array: Uint8Array;
    if (amount instanceof Uint8Array) {
      amountUint8Array = amount;
    } else if (typeof amount === "number") {
      amountUint8Array = this.getPackageData(BigInt(amount));
    } else {
      amountUint8Array = this.getPackageData(amount);
    }
    this.amount = amountUint8Array;
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

  public setPayload(payload: ITransactionPayload) {
    //TODO: learn how to parse ITransactionPayload to Uint8Array
    this.payload = new Uint8Array(QubicConstants.MAX_TRANSACTION_SIZE).fill(0);
    return this;
  }

  public setInputType(inputType: number) {
    this.inputType = inputType;
    return this;
  }

  public getData() {
    return this.data;
  }

  public getOffset() {
    return this.offset;
  }

  public setBuiltData(builtData: Uint8Array) {
    this.builtData = builtData;
    return this;
  }

  public getBuiltData() {
    return this.builtData;
  }

  public setDigest(digest: Uint8Array) {
    this.digest = digest;
  }

  public getDigest() {
    return this.digest;
  }

  public setSignature(signature: Uint8Array) {
    this.signature = signature;
  }

  public getSignature() {
    return this.signature;
  }

  public build() {
    this.setMaxDataSize();
    this.addRaw(this.sourceKey);
    this.addRaw(this.destinationKey);
    this.addRaw(this.amount);
    this.addInt(this.tick);
    this.addShort(this.inputType);
    this.addShort(this.inputSize);
    this.addRaw(this.payload);
    return this;
  }

  private setMaxDataSize() {
    const total =
      this.sourceKey.length +
      this.destinationKey.length +
      this.amount.length +
      4 + // tick
      2 + // inputType
      2 + // inputSize
      this.inputSize +
      this.signature.length;
    this.data = new Uint8Array(total);
  }

  private addRaw(q: Uint8Array) {
    this.data.set(q, this.offset);
    this.offset += q.length;
    return this;
  }

  private getPackageData(value: bigint): Uint8Array {
    let buffer = new ArrayBuffer(8);
    let dataview = new DataView(buffer);
    dataview.setBigInt64(0, value, true);
    return new Uint8Array(buffer);
  }

  private addShort(q: number /* must be a short */) {
    this.data.set(this.FromShort(q), this.offset);
    this.offset += 2;
    return this;
  }

  private addInt(q: number /* must be a short */) {
    this.data.set(this.FromInt(q), this.offset);
    this.offset += 4;
    return this;
  }

  private FromInt(num: number): Uint8Array {
    // If num is a 32-bit integer
    let buffer = new ArrayBuffer(4); // 4 bytes for a 32-bit integer
    let dataview = new DataView(buffer);
    dataview.setInt32(0, num, true); // Use setUint32 if you are dealing with unsigned integers
    return new Uint8Array(buffer);
  }
  private FromShort(num: number): Uint8Array {
    // If num is a 32-bit integer
    let buffer = new ArrayBuffer(2); // 4 bytes for a 32-bit integer
    let dataview = new DataView(buffer);
    dataview.setInt16(0, num, true); // Use setUint32 if you are dealing with unsigned integers
    return new Uint8Array(buffer);
  }
}
