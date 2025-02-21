import Qubic from "../../src/core";

async function getQuorumTickData() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.chain.getQuorumTickData(19231746);
    console.log(response);
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

// Execute the function
getQuorumTickData();
