import Qubic from "../../src/core";

async function getBalanceByIdentity() {
  try {
    // Initialize the Qubic instance with the provider URL
    const qubic = new Qubic({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });

    const identity =
      "IMEKBNRUZIGTDBVJHYNLNDTTIKVCRKYEWPDDQMUIRCASJUOBMFCHUUNEFKRO";
    const response = await qubic.identity.getBalanceByIdentity(identity);
    console.log("response", response);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getBalanceByIdentity();