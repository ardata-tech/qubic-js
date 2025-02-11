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

  test("should fetch approved transactions for a tick", async () => {
    const approvedTxs = await wallet.getApprovedTransactionsForTick("mock-tick");
    expect(approvedTxs).toHaveLength(2);
  });

  test("should fetch transaction status", async () => {
    const status = await wallet.getTransactionStatus("mock-tx-hash");
    expect(status).toBe("mock-transaction-status");
  });

  test("should fetch transaction", async () => {
    const tx = await wallet.getTransaction("mock-tx-hash");
    expect(tx).toHaveProperty("txHash", "mock-tx-hash");
  });

  test("should fetch transfer transactions per tick", async () => {
    const transferTxs = await wallet.getTransferTransactionsPerTick("mock-tick");
    expect(transferTxs).toHaveLength(2);
  });

  test("should fetch issued assets", async () => {
    const issuedAssets = await wallet.getIssuedAssets("mock-address");
    expect(issuedAssets).toHaveLength(2);
  });

  test("should fetch owned assets", async () => {
    const ownedAssets = await wallet.getOwnedAssets("mock-address");
    expect(ownedAssets).toHaveLength(2);
  });

  test("should fetch possessed assets", async () => {
    const possessedAssets = await wallet.getPossessedAssets("mock-address");
    expect(possessedAssets).toHaveLength(2);
  });
});