import Qubic from "../../src/qubic";

const main = async () => {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const identity =
      "CSOXIPNXRTKTCCOEQYNGUOGPOOBCUXZJNOULAFMYBBEUHCHLUZFJZLVEOPGM";
    const amount = 0;
    const seed = "slkdfj";

    //this will create transaction base on the parameter
    //the result will be base64 string that will use to pass to broadcastTransaction
    const tx = await qubic.transaction.createTransaction(
      identity,
      identity,
      amount,
      seed
    );
    
    console.log(tx);

    //this will invoke the RPC Qubic API to send / process the transaction
    await qubic.transaction.broadcastTransaction(tx.base64EncodedTransaction);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
};

main();
