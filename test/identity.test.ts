import { QubicProvider } from "../src/provider";
import { IdentityService } from "../src/identity";

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
    const balance = await identity.getBalanceByIdentity(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO",
    );
    expect(balance).not.toBeNull();
    expect(balance).toHaveProperty("balance");
    expect(balance).toHaveProperty("balance.id");
    expect(balance).toHaveProperty("balance.balance");
    expect(balance).toHaveProperty("balance.validForTick");
    expect(balance).toHaveProperty("balance.latestIncomingTransferTick");
    expect(balance).toHaveProperty("balance.incomingAmount");
    expect(balance).toHaveProperty("balance.outgoingAmount");
    expect(balance).toHaveProperty("balance.numberOfIncomingTransfers");
    expect(balance).toHaveProperty("balance.numberOfOutgoingTransfers");
  });

  test("should fetch Issued Assets", async () => {
    const result = await identity.getIssuedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO",
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("issuedAssets");
    expect(Array.isArray(result?.issuedAssets)).toBe(true);
  });

  test("should fetch owned Assets", async () => {
    const result = await identity.getOwnedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO",
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("ownedAssets");
    expect(Array.isArray(result?.ownedAssets)).toBe(true);
  });

  test("should fetch possessed assets", async () => {
    const result = await identity.getPossessedAssets(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO",
    );
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("possessedAssets");
    expect(Array.isArray(result?.possessedAssets)).toBe(true);
  });

  test("should fetch balance by address", async () => {
    const balance = await identity.getBalanceByAddress(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO",
    );
    expect(balance).not.toBeNull();
  });

  test("should create ID package", async () => {
    const idPackage = await identity.createIdentity(
      "whtvfwregijarxrhqzcedqhsyqpjgerwcvgkvqjucomppamaaltluel",
    );
    expect(idPackage).not.toBeNull();
    expect(idPackage).toHaveProperty("publicId");
    expect(idPackage).toHaveProperty("publicKey");
    expect(idPackage).toHaveProperty("privateKey");

    console.log(`ID Package: ${JSON.stringify(idPackage)}`);
  });

  test("should load identity from private key", async () => {
    const privateKey = new Uint8Array(32); // Mock private key
    const idPackage = await identity.loadIdentityFromPrivateKey(privateKey);
    expect(idPackage).not.toBeNull();
    expect(idPackage).toHaveProperty("publicKey");
    expect(idPackage).toHaveProperty("privateKey");
    expect(idPackage).toHaveProperty("publicId");
  });

  test("should verify identity", async () => {
    const isValid = await identity.verifyIdentity(
      "JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVKHO",
    );
    expect(isValid).toBe(true);
  });
});