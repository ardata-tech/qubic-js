import Qubic from "../../src/core";

async function getLatestTick() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    // Initialize the Qubic instance with the provider URL
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    // Fetch the latest tick
    const latestTick = await qubic.chain.getLatestTick();
    console.log(`Latest tick: ${latestTick}`);
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

// Execute the function
getLatestTick();