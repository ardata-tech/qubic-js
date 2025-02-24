import Qubic from "../../src/core";

async function getEntityBidOrders() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://api.qubic.org",
    version: 1,
  });

  // Define the asset name, issuer ID, and offset
  const entityId = "entityId";
  const offset = "0";

  try {
    const response = await qubic.qx.getEntityBidOrders(entityId, offset);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

getEntityBidOrders();