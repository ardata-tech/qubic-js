import Qubic from "../../src/qubic";

const main = async () => {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {

    //params
    const from = "wallet-address-source";
    const to = "wallet-address-destination";
    const seed = "wallet-seed"
    const latestTick = await qubic.chain.getLatestTick() || 0;

    //assemble the transaction
    //create signing
    //broadcast to RPC endpoint
    const tx = await qubic.transaction.createTransaction(
      from,
      to,
      100,
      seed,
      latestTick + 3
    );
    console.log("transaction", tx);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
};

main();
