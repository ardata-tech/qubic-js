import Qubic from "../../src/qubic";

async function getPossessedAssets() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.identity.getPossessedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getPossessedAssets();