import { ITransactionBuilderPayload } from "../types";

class TransactionBuilder {

    private payload: ITransactionBuilderPayload;

    constructor(payload: ITransactionBuilderPayload) {
        this.payload = payload;
        this.setSourcePublicKey(this.payload.issuer)
  }

    public setSourcePublicKey(sourcePublicKey: string) {
      return this
  }

  public setDestinationPublicKey(address: string) {}

  public setTick(targetTick: number) {}

  public setInputSize(packageSize: number) {}

  public setPayload(qxOrderPayload: any) {}

  public setInputType(inputType: number) {}

    public setAmount() {
      
  }

  public build() {}
}
