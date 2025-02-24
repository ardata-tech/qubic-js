import Qubic from "../../src/core";

async function getBlockHeight() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://api.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.qx.getFees();
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getBlockHeight();
