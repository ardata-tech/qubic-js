import { QubicProvider } from "../src/provider";
import { Wallet } from "../src/wallet";

describe("Wallet Module", () => {
  let wallet: Wallet;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    wallet = new Wallet(provider);
  });

  test("should fetch balance by identity", async () => {
    const balance = await wallet.getBalanceByIdentity(
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
    const result = await wallet.getIssuedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("issuedAssets");
    expect(Array.isArray(result?.issuedAssets)).toBe(true);
  });

  test("should fetch owned Assets", async () => {
    const result = await wallet.getOwnedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("ownedAssets");
    expect(Array.isArray(result?.ownedAssets)).toBe(true);
  });

  test("should fetch possessed assets", async () => {
    const result = await wallet.getPossessedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO"
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("possessedAssets");
    expect(Array.isArray(result?.possessedAssets)).toBe(true);
  });

  test("should fetch transactions", async () => {
    const txId = "pummtezzeepkgddhlipnclaxaykhqxgdkffhqjqiuespwtxjnbuvrzwbfsaj";
    const result = await wallet.getTransactions(txId);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("transaction");
    expect(result).toHaveProperty("transaction.sourceId");
    expect(result).toHaveProperty("transaction.destId");
    expect(result).toHaveProperty("transaction.amount");
    expect(result).toHaveProperty("transaction.tickNumber");
    expect(result).toHaveProperty("transaction.inputType");
    expect(result).toHaveProperty("transaction.inputHex");
    expect(result).toHaveProperty("transaction.signatureHex");
    expect(result).toHaveProperty("transaction.txId");
  });


  test("should fetch transactions status", async () => {
    const txId = "pummtezzeepkgddhlipnclaxaykhqxgdkffhqjqiuespwtxjnbuvrzwbfsaj";
    const result = await wallet.getTransactionsStatus(txId);
    console.log("result", result);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("transactionStatus");
    expect(result).toHaveProperty("transactionStatus.txId");
    expect(result).toHaveProperty("transactionStatus.moneyFlew");
  });



  test("should fetch transfer transactions", async () => {
    const identity =
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO";
    const result = await wallet.getTransferTransactions(identity);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("transferTransactionsPerTick");
    expect(Array.isArray(result?.transferTransactionsPerTick)).toBe(true);
  });



  test("should fetch approved transactions", async () => {
    const result = await wallet.getApprovedTransactions(19231746);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("approvedTransactions");
    expect(Array.isArray(result?.approvedTransactions)).toBe(true);
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

  // TODO:
  // commenting this for now because I dont have an address yet
  //
  // test("should fetch balance by address", async () => {
  //   const balance = await wallet.getBalanceByAddress("");
  //   expect(balance).not.toBeNull();
  // });

  // TODO:
  // commenting this for now because I need to compose the transaction
  //
  // test("should broadcast a transaction", async () => {
  //   const tx = await wallet.createTransaction("mock-from", "mock-to", 500);
  //   const broadcastTxHash = await wallet.broadcastTransaction(tx);
  //   expect(broadcastTxHash).toBe("mock-broadcast-tx-hash");
  // });

  test("should create ID package", async () => {
    const idPackage = await wallet.createIdPackage('whtvfwregijarxrhqzcedqhsyqpjgerwcvgkvqjucomppamaaltluel');
    expect(idPackage).not.toBeNull();
    expect(idPackage).toHaveProperty("id");
    expect(idPackage).toHaveProperty("publicKey");
    expect(idPackage).toHaveProperty("privateKey");

    console.log(`ID Package: ${JSON.stringify(idPackage)}`);
  });
});
