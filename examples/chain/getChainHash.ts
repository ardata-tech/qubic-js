import Qubic from "../../src/qubic";

async function getChainHash() {
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.chain.getChainHash(19231746);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

getChainHash();