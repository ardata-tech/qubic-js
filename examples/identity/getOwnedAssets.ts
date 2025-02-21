import Qubic from "../../src/core";

async function getOwnedAssets() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.identity.getOwnedAssets(
      "IMEKBNRUZIGTDBVJHYNLNDTTIKVCRKYEWPDDQMUIRCASJUOBMFCHUUNEFKRO"
    );
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getOwnedAssets();