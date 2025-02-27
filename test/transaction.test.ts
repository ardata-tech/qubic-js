import { QubicProvider } from "../src/provider";
import { TransactionService } from "../src/transaction/TransactionService";
import {
  IGetApproveTransactions,
  IGetTransactionsStatus,
  IGetTransaction,
  IGetTransferTransaction,
  IBroadcastTransactionResponse,
} from "../src/types";

jest.mock("../src/transaction/TransactionService");

describe("TransactionService Module", () => {
  let transactionService: TransactionService;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    transactionService = new TransactionService(provider);
  });

  test("should fetch approved transactions", async () => {
    const mockResponse: IGetApproveTransactions = { approvedTransactions: [] };
    jest
      .spyOn(transactionService, "getApprovedTransactions")
      .mockResolvedValue(mockResponse);

    const result = await transactionService.getApprovedTransactions(19231746);
    expect(result).toBe(mockResponse);
  });

  test("should fetch transaction status", async () => {
    const mockResponse: IGetTransactionsStatus = {
      transactionStatus: { txId: "txId", moneyFlew: true },
    };
    jest
      .spyOn(transactionService, "getTransactionsStatus")
      .mockResolvedValue(mockResponse);

    const result = await transactionService.getTransactionsStatus("txId");
    expect(result).toBe(mockResponse);
  });

  test("should fetch transaction details", async () => {
    const mockResponse: IGetTransaction = {
      transaction: {
        sourceId: "sourceId",
        destId: "destId",
        amount: "100",
        tickNumber: 1,
        inputType: 0,
        inputSize: 0,
        inputHex: "inputHex",
        signatureHex: "signatureHex",
        txId: "txId",
      },
    };
    jest
      .spyOn(transactionService, "getTransactions")
      .mockResolvedValue(mockResponse);

    const result = await transactionService.getTransactions("txId");
    expect(result).toBe(mockResponse);
  });

  test("should fetch transfer transactions", async () => {
    const mockResponse: IGetTransferTransaction = {
      transferTransactionsPerTick: [],
    };
    jest
      .spyOn(transactionService, "getTransferTransactions")
      .mockResolvedValue(mockResponse);

    const result = await transactionService.getTransferTransactions("identity");
    expect(result).toBe(mockResponse);
  });

  test("should broadcast transaction", async () => {
    const mockResponse: IBroadcastTransactionResponse = {
      peersBroadcasted: 1,
      encodedTransaction: "encodedTransaction",
      transactionId: "transactionId",
    };
    jest
      .spyOn(transactionService, "broadcastTransaction")
      .mockResolvedValue(mockResponse);

    const result =
      await transactionService.broadcastTransaction("encodedTransaction");
    expect(result).toBe(mockResponse);
  });
});
