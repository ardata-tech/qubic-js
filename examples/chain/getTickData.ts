import Qubic from "../../src/qubic";

async function getTickData() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const latestTick = await qubic.chain.getTickData(19231746);
    console.log(JSON.stringify(latestTick));
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

// Execute the function
getTickData();