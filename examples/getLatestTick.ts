import Qubic from "../src/qubic";

async function getLatestTick() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic("https://mock.qubic.org");

  try {
    // Fetch the latest tick
    const latestTick = await qubic.chain.getLatestTick();
    console.log(`Latest tick: ${latestTick.tick}`);
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

// Execute the function
getLatestTick();