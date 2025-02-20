import Qubic from "../../src/qubic";

async function createIdPackageFromPrivateKey() {
  // Initialize the Qubic instance with the provider URL
  const qubic = new Qubic({
    providerUrl: "https://rpc.qubic.org",
    version: 1,
  });

  try {
    const seed = qubic.utils.createSeed();
    const idPackage = await qubic.identity.createIdPackage(seed);
    const privateKey = idPackage.privateKey;
    const idPackageFromPrivateKey = await qubic.identity.createIdPackageFromPrivateKey(privateKey);
    console.log("response", JSON.stringify(idPackageFromPrivateKey));
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

createIdPackageFromPrivateKey();