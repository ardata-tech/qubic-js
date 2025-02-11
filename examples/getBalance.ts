import Qubic from "../src/qubic";

async function getBalance() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic("https://mock.qubic.org");

  // Address for which to fetch the balance
  const address = "mock-address";

  try {
    // Fetch the balance
    const balance = await qubic.wallet.getBalance(address);
    console.log(`Balance for address ${address}: ${balance}`);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

// Execute the function
getBalance();