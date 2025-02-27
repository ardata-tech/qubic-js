import { QubicProvider } from "../src/provider";
import { IdentityService } from "../src/identity/IdentityService";
import {
  IGetBalanceByIdentity,
  IGetIssuedAssets,
  IGetOwnedAssets,
  IGetPossessedAssets,
} from "../src/types";

jest.mock("../src/identity/IdentityService");

describe("Identity Module", () => {
  let identity: IdentityService;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    identity = new IdentityService(provider);
  });

  test("should fetch balance by identity", async () => {
    const mockResponse: IGetBalanceByIdentity = {
      balance: {
        id: "identity1",
        balance: "1000",
        validForTick: 19231746,
        latestIncomingTransferTick: 19231740,
        latestOutgoingTransferTick: 19231745,
        incomingAmount: "500",
        outgoingAmount: "200",
        numberOfIncomingTransfers: 5,
        numberOfOutgoingTransfers: 2,
      },
    };
    jest.spyOn(identity, 'getBalanceByIdentity').mockResolvedValue(mockResponse);

    const result = await identity.getBalanceByIdentity("JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO");
    expect(result).toBe(mockResponse);
  });

  test("should fetch Issued Assets", async () => {
    const mockResponse: IGetIssuedAssets = { issuedAssets: [] };
    jest.spyOn(identity, 'getIssuedAssets').mockResolvedValue(mockResponse);

    const result = await identity.getIssuedAssets("JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO");
    expect(result).toBe(mockResponse);
  });

  test("should fetch owned Assets", async () => {
    const mockResponse: IGetOwnedAssets = { ownedAssets: [] };
    jest.spyOn(identity, 'getOwnedAssets').mockResolvedValue(mockResponse);

    const result = await identity.getOwnedAssets("JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO");
    expect(result).toBe(mockResponse);
  });

  test("should fetch possessed assets", async () => {
    const mockResponse: IGetPossessedAssets = { possessedAssets: [] };
    jest.spyOn(identity, 'getPossessedAssets').mockResolvedValue(mockResponse);

    const result = await identity.getPossessedAssets("JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO");
    expect(result).toBe(mockResponse);
  });

  test("should fetch balance by address", async () => {
    const mockResponse = { balance: "1000" };
    jest.spyOn(identity, 'getBalanceByAddress').mockResolvedValue(mockResponse);

    const result = await identity.getBalanceByAddress("JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO");
    expect(result).toBe(mockResponse);
  });

  test("should create ID package", async () => {
    const mockIdPackage = {
      publicKey: new Uint8Array(32),
      privateKey: new Uint8Array(32),
      publicId: "publicId",
    };
    jest.spyOn(identity, 'createIdentity').mockResolvedValue(mockIdPackage);

    const idPackage = await identity.createIdentity("whtvfwregijarxrhqzcedqhsyqpjgerwcvgkvqjucomppamaaltluel");
    expect(idPackage).not.toBeNull();
    expect(idPackage).toHaveProperty("publicId");
    expect(idPackage).toHaveProperty("publicKey");
    expect(idPackage).toHaveProperty("privateKey");
  });

  test("should load identity from private key", async () => {
    const mockIdPackage = {
      publicKey: new Uint8Array(32),
      privateKey: new Uint8Array(32),
      publicId: "publicId",
    };
    jest.spyOn(identity, 'loadIdentityFromPrivateKey').mockResolvedValue(mockIdPackage);

    const privateKey = new Uint8Array(32); // Mock private key
    const idPackage = await identity.loadIdentityFromPrivateKey(privateKey);
    expect(idPackage).not.toBeNull();
    expect(idPackage).toHaveProperty("publicKey");
    expect(idPackage).toHaveProperty("privateKey");
    expect(idPackage).toHaveProperty("publicId");
  });

  test("should verify identity", async () => {
    jest.spyOn(identity, 'verifyIdentity').mockResolvedValue(true);

    const isValid = await identity.verifyIdentity("JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO");
    expect(isValid).toBe(true);
  });
});