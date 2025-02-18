import Qubic from "../../src/qubic";
import { TransactionBuilder } from '../../src/transaction/TransactionBuilder'

async function main() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    //validate the destinationKey
    //validate the sourceKey
    const identitySourceId =
      "CSOXIPNXRTKTCCOEQYNGUOGPOOBCUXZJNOULAFMYBBEUHCHLUZFJZLVEOPGM";
    
    const identityDestinationId =
      "CSOXIPNXRTKTCCOEQYNGUOGPOOBCUXZJNOULAFMYBBEUHCHLUZFJZLVEOPGM";
    
    const signSeed = "slkdfj";

    const identityResult = await qubic.identity.verifyIdentity(identitySourceId);
    console.log("identityResult", identityResult);

    const tx = new TransactionBuilder(qubic.identity)
    await tx.setSource(identitySourceId);
    
      // .setSource(identitySourceId))
      // .setDestination(identityDestinationId)
      // .setAmount(10)
      // .setTick(10)
      // .setInputSize(10)
      // .setInputType(1)
      // .setPayload(signSeed)
      // .build();
    
    console.log(tx);


  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

main();