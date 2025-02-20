import Qubic from "../../src/qubic";

const main = async () => {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    //if you don't have wallet yet
    //create wallet here: https://wallet.qubic.org/

    //TODO:
    //need to fill-up the parameters in order to process the transaction
    const from = "wallet-address-source";
    const to = "wallet-address-destination";
    const seed = "wallet-seed";
    const latestTick = (await qubic.chain.getLatestTick()) || 0;

    //process flow:
    //this function will assemble the transaction parameter,
    //it then process the transaction signing,
    //after that it will broadcast to RPC via Rest API
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
