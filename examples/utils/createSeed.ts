import Qubic from "../../src/qubic";

async function createSeed() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const seed = qubic.utils.createSeed();
    console.log(seed);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

createSeed();