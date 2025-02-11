import Qubic from "../src/qubic";

describe("Qubic SDK Structure", () => {
  let qubic: Qubic;

  beforeAll(() => {
    qubic = new Qubic("https://mock.qubic.org");
  });

  test("should initialize with a provider", () => {
    expect(qubic.provider).toBeDefined();
  });

  test("should fetch balance", async () => {
    const balance = await qubic.wallet.getBalance("mock-address");
    expect(balance).toBe(1000);
  });

  test("should create and sign a transaction", async () => {
    const tx = await qubic.wallet.createTransaction("mock-from", "mock-to", 500);
    expect(tx).toHaveProperty("from");
    expect(tx).toHaveProperty("to");

    const signedTx = await qubic.wallet.signTransaction(tx);
    expect(signedTx).toHaveProperty("signature");
  });

  test("should interact with a contract", async () => {
    const contract = qubic.contract("mock-contract-address");
    const result = await contract.callMethod("getData", []);
    expect(result).toContain("mock-result-for-getData");
  });
});
