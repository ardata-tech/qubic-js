import Qubic from "../../src/core";

async function getBalanceByAddress() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.identity.getBalanceByAddress(
      "IMEKBNRUZIGTDBVJHYNLNDTTIKVCRKYEWPDDQMUIRCASJUOBMFCHUUNEFKRO",
    );
    console.log("response", JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getBalanceByAddress();
