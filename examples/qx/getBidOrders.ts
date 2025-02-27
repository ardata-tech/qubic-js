import Qubic from "../../src/core";

async function getAssetBidOrders() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://api.qubic.org",
    version: 1,
  });

  // Define the asset name, issuer ID, and offset
  const assetName = "assetName";
  const issuerId = "issuerId";
  const offset = "0";

  try {
    const response = await qubic.qx.getAssetBidOrders(
      assetName,
      issuerId,
      offset,
    );
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getAssetBidOrders();
