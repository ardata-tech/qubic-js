import Qubic from "../../src/core";

async function getStoreHash() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });
  const response = await qubic.chain.getStoreHash(19231746);
  console.log(JSON.stringify(response));
}

getStoreHash();