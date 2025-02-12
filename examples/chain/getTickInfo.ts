import Qubic from "../../src/qubic";

async function getTickInfo() {
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const response = await qubic.chain.getTickInfo();
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching latest tick:", error);
  }
}

getTickInfo();