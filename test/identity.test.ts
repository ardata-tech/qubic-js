import { QubicProvider } from "../src/provider";
import { Identity } from "../src/identity";

describe("Identity Module", () => {
  let identity: Identity;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    identity = new Identity(provider);
  });

  test("should fetch balance by identity", async () => {
    const balance = await identity.getBalanceByIdentity(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    expect(balance).not.toBeNull();
    expect(balance).toHaveProperty("balance");
    expect(balance).toHaveProperty("balance.id");
    expect(balance).toHaveProperty("balance.balance");
    expect(balance).toHaveProperty("balance.validForTick");
    expect(balance).toHaveProperty(
      "balance.latestIncomingTransferTick"
    );
    expect(balance).toHaveProperty("balance.incomingAmount");
    expect(balance).toHaveProperty("balance.outgoingAmount");
    expect(balance).toHaveProperty(
      "balance.numberOfIncomingTransfers"
    );
    expect(balance).toHaveProperty(
      "balance.numberOfOutgoingTransfers"
    );
  });

  test("should fetch Issued Assets", async () => {
    const result = await identity.getIssuedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("issuedAssets");
    expect(Array.isArray(result?.issuedAssets)).toBe(true);
  });

  test("should fetch owned Assets", async () => {
    const result = await identity.getOwnedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("ownedAssets");
    expect(Array.isArray(result?.ownedAssets)).toBe(true);
  });

  test("should fetch possessed assets", async () => {
    const result = await identity.getPossessedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("possessedAssets");
    expect(Array.isArray(result?.possessedAssets)).toBe(true);
  });

  // TODO: Fix this test
  // test("should create and sign a transaction", async () => {
  //   const tx = await identity.createTransaction("mock-from", "mock-to", 500);
  //   expect(tx).toHaveProperty("from");
  //   expect(tx).toHaveProperty("to");

  //   const signedTx = await identity.signTransaction(tx);
  //   expect(signedTx).toHaveProperty("signature");
  // });

  // TODO: Fix this test
  // test("should send a transaction", async () => {
  //   const tx = await identity.createTransaction("mock-from", "mock-to", 500);
  //   const signedTx = await identity.signTransaction(tx);
  //   const txHash = await identity.sendTransaction(signedTx);
  //   expect(txHash).toBe("mock-tx-hash");
  // });

  // TODO:: Fix this test
  // test("should fetch balance by address", async () => {
  //   const balance = await identity.getBalanceByAddress("");
  //   expect(balance).not.toBeNull();
  // });

  // TODO:: Fix this test
  // test("should broadcast a transaction", async () => {
  //   const tx = await identity.createTransaction("mock-from", "mock-to", 500);
  //   const broadcastTxHash = await identity.broadcastTransaction(tx);
  //   expect(broadcastTxHash).toBe("mock-broadcast-tx-hash");
  // });

  test("should create ID package", async () => {
    const idPackage = await identity.createIdPackage('whtvfwregijarxrhqzcedqhsyqpjgerwcvgkvqjucomppamaaltluel');
    expect(idPackage).not.toBeNull();
    expect(idPackage).toHaveProperty("id");
    expect(idPackage).toHaveProperty("publicKey");
    expect(idPackage).toHaveProperty("privateKey");

    console.log(`ID Package: ${JSON.stringify(idPackage)}`);
  });
});
