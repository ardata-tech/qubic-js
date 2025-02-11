import { QubicProvider } from "../src/providers/QubicProvider";
import { Wallet } from "../src/wallet";

describe("Wallet Module", () => {
  let wallet: Wallet;

  beforeAll(() => {
    const provider = new QubicProvider("https://mock.qubic.org");
    wallet = new Wallet(provider);
  });

  test("should fetch balance", async () => {
    const balance = await wallet.getBalance("mock-address");
    expect(balance).toBe(1000);
  });

  test("should create and sign a transaction", async () => {
    const tx = await wallet.createTransaction("mock-from", "mock-to", 500);
    expect(tx).toHaveProperty("from");
    expect(tx).toHaveProperty("to");

    const signedTx = await wallet.signTransaction(tx);
    expect(signedTx).toHaveProperty("signature");
  });

  test("should send a transaction", async () => {
    const tx = await wallet.createTransaction("mock-from", "mock-to", 500);
    const signedTx = await wallet.signTransaction(tx);
    const txHash = await wallet.sendTransaction(signedTx);
    expect(txHash).toBe("mock-tx-hash");
  });

  test("should broadcast a transaction", async () => {
    const tx = await wallet.createTransaction("mock-from", "mock-to", 500);
    const broadcastTxHash = await wallet.broadcastTransaction(tx);
    expect(broadcastTxHash).toBe("mock-broadcast-tx-hash");
  });
});