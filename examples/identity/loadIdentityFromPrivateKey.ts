import Qubic from "../../src/core";

async function loadIdentityFromPrivateKey() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const seed = qubic.utils.createSeed();
    const idPackage = await qubic.identity.createIdentity(seed);
    const privateKey = idPackage.privateKey;
    const idPackageFromPrivateKey =
      await qubic.identity.loadIdentityFromPrivateKey(privateKey);
    console.log("response", JSON.stringify(idPackageFromPrivateKey));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

loadIdentityFromPrivateKey();
