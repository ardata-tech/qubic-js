import Qubic from "../../src/qubic";

async function getBalanceByIdentity() {
  try {
    // Initialize the Qubic instance with the provider URL
    const qubic = new Qubic({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });

    const identity =
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO";
    const response = await qubic.wallet.getBalanceByIdentity(identity);
    console.log("response", response);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getBalanceByIdentity();