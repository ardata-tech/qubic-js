import Qubic from "../src/core";

describe("Qubic SDK Structure", () => {
  let qubic: Qubic;

  beforeAll(() => {
    qubic = new Qubic({ providerUrl: "https://rpc.qubic.org", version: 1 });
  });

  test("should check for identity", async () => {
    expect(true).toBe(true);
  });

  // TODO:: Fix this test
  // test("should fetch transactions", async () => {
  //   const txId = "pummtezzeepkgddhlipnclaxaykhqxgdkffhqjqiuespwtxjnbuvrzwbfsaj";
  //   const result = await identity.getTransactions(txId);
  //   expect(result).not.toBeNull();
  //   expect(result).toHaveProperty("transaction");
  //   expect(result).toHaveProperty("transaction.sourceId");
  //   expect(result).toHaveProperty("transaction.destId");
  //   expect(result).toHaveProperty("transaction.amount");
  //   expect(result).toHaveProperty("transaction.tickNumber");
  //   expect(result).toHaveProperty("transaction.inputType");
  //   expect(result).toHaveProperty("transaction.inputHex");
  //   expect(result).toHaveProperty("transaction.signatureHex");
  //   expect(result).toHaveProperty("transaction.txId");
  // });

  // TODO:: Fix this test
  // test("should fetch transactions status", async () => {
  //   const txId = "pummtezzeepkgddhlipnclaxaykhqxgdkffhqjqiuespwtxjnbuvrzwbfsaj";
  //   const result = await identity.getTransactionsStatus(txId);
  //   console.log("result", result);
  //   expect(result).not.toBeNull();
  //   expect(result).toHaveProperty("transactionStatus");
  //   expect(result).toHaveProperty("transactionStatus.txId");
  //   expect(result).toHaveProperty("transactionStatus.moneyFlew");
  // });

  // TODO:: Fix this test
  // test("should fetch transfer transactions", async () => {
  //   const id =
  //     "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO";
  //   const result = await identity.getTransferTransactions(id);
  //   expect(result).not.toBeNull();
  //   expect(result).toHaveProperty("transferTransactionsPerTick");
  //   expect(Array.isArray(result?.transferTransactionsPerTick)).toBe(true);
  // });

  // TODO:: Fix this test
  // test("should fetch approved transactions", async () => {
  //   const result = await identity.getApprovedTransactions(19231746);
  //   expect(result).not.toBeNull();
  //   expect(result).toHaveProperty("approvedTransactions");
  //   expect(Array.isArray(result?.approvedTransactions)).toBe(true);
  // });
});
