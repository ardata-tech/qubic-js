import { Contract } from "../src/contract";
import Qubic from "../src/qubic";

async function querySmartContract() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic("https://mock.qubic.org");

  // Smart contract address and query parameters
  const contractAddress = "mock-contract-address";
  const contract = new Contract(qubic.provider, contractAddress);

  try {
    // Query the smart contract
    const result = await contract.querySmartContract("testMethod", []);
    console.log(`Smart contract query result: ${JSON.stringify(result)}`);
  } catch (error) {
    console.error("Error querying smart contract:", error);
  }
}

// Execute the function
querySmartContract();