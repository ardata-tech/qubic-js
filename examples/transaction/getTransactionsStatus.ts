import Qubic from "../../src/core";

async function getTransactionsStatus() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const txId = "pummtezzeepkgddhlipnclaxaykhqxgdkffhqjqiuespwtxjnbuvrzwbfsaj";
    const response = await qubic.transaction.getTransactionsStatus(txId);
    console.log("response", JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getTransactionsStatus();
