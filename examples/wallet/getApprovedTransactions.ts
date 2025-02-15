import Qubic from "../../src/qubic";

async function getApprovedTransactions() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.wallet.getApprovedTransactions(19231746);
    console.log("response", JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getApprovedTransactions();