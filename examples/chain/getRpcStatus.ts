import Qubic from "../../src/core";

async function getRpcStatus() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const latestTick = await qubic.chain.getRpcStatus();
    console.log(JSON.stringify(latestTick));
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

// Execute the function
getRpcStatus();
