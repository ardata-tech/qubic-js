import Qubic from "../../src/qubic";

async function getIssuedAssets() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const identity = "IMEKBNRUZIGTDBVJHYNLNDTTIKVCRKYEWPDDQMUIRCASJUOBMFCHUUNEFKRO";
    const response = await qubic.identity.getIssuedAssets(identity);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getIssuedAssets();