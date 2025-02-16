import Qubic from "../../src/qubic";

async function createIdPackage() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const seed = qubic.utils.createSeed();
    const idPackage = await qubic.wallet.createIdPackage(seed);
    console.log("response", JSON.stringify(idPackage));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

createIdPackage();