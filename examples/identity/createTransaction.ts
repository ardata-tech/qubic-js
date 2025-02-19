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

  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

main();