import Qubic from "../../src/qubic";

async function getRpcStatus() {
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