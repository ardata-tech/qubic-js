import Qubic from "../../src/core";

async function verifyIdentity() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const seed = qubic.utils.createSeed();
    const idPackage = await qubic.identity.createIdentity(seed);
    const publicId = idPackage.publicId;
    const verified = await qubic.identity.verifyIdentity(publicId);
    console.log("response", verified);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

verifyIdentity();
