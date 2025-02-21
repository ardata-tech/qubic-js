import Qubic from "../../src/core";

async function createIdentity() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const seed = qubic.utils.createSeed();
    const identity = await qubic.identity.createIdentity(seed);
    console.log("response", JSON.stringify(identity));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

createIdentity();
