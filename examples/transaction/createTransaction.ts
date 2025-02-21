import Qubic from "../../src/core";

const main = async () => {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    // Create wallet here: https://wallet.qubic.org/ and get the wallet address and seed
    // Make sure to have enough balance to process the transaction
    // Fill-up the parameters in order to process the transaction

    // Source wallet address
    const fromWalletAddress =
      "IMEKBNRUZIGTDBVJHYNLNDTTIKVCRKYEWPDDQMUIRCASJUOBMFCHUUNEFKRO";
    const fromSeed = "sqvryrsucaicyxpqwzjpewkmdhodjntgpqrajykmacyajnoxjdtnbxn";
    const fromIdentity = await qubic.identity.createIdentity(fromSeed);

    // Recipient wallet address
    const toWalletAddress =
      "ECRXFGMYUXWETCOUKCRIQDNCEOJAHUXFTQETBZSDVCLEMKPZZMJLVOECGHRB";

    // Get the latest tick
    const latestTick = (await qubic.chain.getLatestTick()) || 0;

    // Create a transaction
    const transaction = await qubic.transaction.createTransaction(
      fromWalletAddress,
      toWalletAddress,
      100,
      latestTick + 3,
    );

    // Sign the transaction
    const signedTransaction = await qubic.transaction.signTransaction(
      transaction,
      fromIdentity.privateKey,
    );

    // Encode the transaction to base64
    const encodedTransaction =
      qubic.transaction.encodeTransactionToBase64(signedTransaction);

    // Broadcast the transaction
    const result =
      await qubic.transaction.broadcastTransaction(encodedTransaction);
    console.log("result", result);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
};

main();
