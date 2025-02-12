import Qubic from "../../src/qubic";

async function getComputors() {
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.chain.getComputors(147);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

// Execute the function
getComputors();