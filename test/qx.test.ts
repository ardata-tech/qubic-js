import { QubicProvider } from "../src/provider";
import { QxService } from "../src/qx/QxService";
import {
  IQxAssetAskOrders,
  IQxAssetBidOrders,
  IQxEntityAskOrders,
  IQxEntityBidOrders,
  IQxFees,
} from "../src/types";

jest.mock("../src/qx/QxService");

describe("QxService Module", () => {
  let qxService: QxService;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    qxService = new QxService(provider);
  });

  test("should fetch ask orders for asset", async () => {
    const mockResponse: IQxAssetAskOrders = {
      orders: [{ entityId: "entity1", price: "100", numberOfShares: "10" }],
    };
    jest.spyOn(qxService, "getAskOrders").mockResolvedValue(mockResponse);

    const result = await qxService.getAskOrders("assetName", "issuerId", "0");
    expect(result).toBe(mockResponse);
  });

  test("should fetch bid orders for asset", async () => {
    const mockResponse: IQxAssetBidOrders = {
      orders: [{ entityId: "entity1", price: "100", numberOfShares: "10" }],
    };
    jest.spyOn(qxService, "getAssetBidOrders").mockResolvedValue(mockResponse);

    const result = await qxService.getAssetBidOrders(
      "assetName",
      "issuerId",
      "0",
    );
    expect(result).toBe(mockResponse);
  });

  test("should fetch ask orders for entity", async () => {
    const mockResponse: IQxEntityAskOrders = {
      orders: [
        {
          issuerId: "issuer1",
          assetName: "asset1",
          price: "100",
          numberOfShares: "10",
        },
      ],
    };
    jest.spyOn(qxService, "getEntityAskOrders").mockResolvedValue(mockResponse);

    const result = await qxService.getEntityAskOrders("entityId", "0");
    expect(result).toBe(mockResponse);
  });

  test("should fetch bid orders for entity", async () => {
    const mockResponse: IQxEntityBidOrders = {
      orders: [
        {
          issuerId: "issuer1",
          assetName: "asset1",
          price: "100",
          numberOfShares: "10",
        },
      ],
    };
    jest.spyOn(qxService, "getEntityBidOrders").mockResolvedValue(mockResponse);

    const result = await qxService.getEntityBidOrders("entityId", "0");
    expect(result).toBe(mockResponse);
  });

  test("should fetch Qx fees", async () => {
    const mockResponse: IQxFees = {
      assetIssuanceFee: 0,
      transferFee: 0,
      tradeFee: 0,
    };
    jest.spyOn(qxService, "getFees").mockResolvedValue(mockResponse);

    const result = await qxService.getFees();
    expect(result).toBe(mockResponse);
  });
});
