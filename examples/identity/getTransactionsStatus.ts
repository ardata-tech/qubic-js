import Qubic from "../../src/qubic";

async function getTransactionsStatus() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const txId = "pummtezzeepkgddhlipnclaxaykhqxgdkffhqjqiuespwtxjnbuvrzwbfsaj";
    const response = await qubic.wallet.getTransactionsStatus(txId);
    console.log("response", JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getTransactionsStatus();