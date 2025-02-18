import Qubic from "../../src/qubic";

async function getTransferTransactions() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const identity =
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO";
    const response = await qubic.transaction.getTransferTransactions(identity);
    console.log("response", JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getTransferTransactions();