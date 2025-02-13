import { QubicProvider } from "../src/providers/QubicProvider";
import { Chain } from "../src/chain";

describe("Chain Module", () => {
  let chain: Chain;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    chain = new Chain(provider);
  });

  test("should fetch latest tick", async () => {
    const result = await chain.getLatestTick();
    expect(result).not.toBeNull();
    expect(typeof result).toBe("number");
  });

  test("should fetch tick data", async () => {
    const result = await chain.getTickData(19231746);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("tickData");
    expect(result?.tickData).toHaveProperty("computorIndex");
    expect(result?.tickData).toHaveProperty("epoch");
    expect(result?.tickData).toHaveProperty("tickNumber");
    expect(result?.tickData).toHaveProperty("timestamp");
    expect(result?.tickData).toHaveProperty("varStruct");
    expect(result?.tickData).toHaveProperty("timeLock");
    expect(result?.tickData).toHaveProperty("transactionIds");
    expect(result?.tickData).toHaveProperty("contractFees");
    expect(result?.tickData).toHaveProperty("signatureHex");
  });

  test("should fetch RPC status", async () => {
    const result = await chain.getRpcStatus();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("lastProcessedTick");
    expect(result).toHaveProperty("lastProcessedTicksPerEpoch");
    expect(result).toHaveProperty("skippedTicks");
    expect(result).toHaveProperty("processedTickIntervalsPerEpoch");
    expect(result).toHaveProperty("emptyTicksPerEpoch");
  });

  test("should fetch chain hash", async () => {
    const result = await chain.getChainHash(19231746);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("hexDigest");
  });

  test("should fetch quorum tick data", async () => {
    const result = await chain.getQuorumTickData(19231746);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("quorumTickData");
    expect(result?.quorumTickData).toHaveProperty("quorumTickStructure");
    expect(result?.quorumTickData).toHaveProperty("quorumDiffPerComputor");
  });

  test("should fetch store hash", async () => {
    const result = await chain.getStoreHash(19231746);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("hexDigest");
  });

  test("should perform health check", async () => {
    const result = await chain.getHealthCheck();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("status", true);
  });

  test("should fetch computors", async () => {
    const result = await chain.getComputors(147);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("computors");
    expect(result?.computors).toHaveProperty("epoch");
    expect(result?.computors).toHaveProperty("identities");
    expect(result?.computors).toHaveProperty("signatureHex");
  });

  test("should fetch tick info", async () => {
    const result = await chain.getTickInfo();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("tickInfo");
    expect(result?.tickInfo).toHaveProperty("tick");
    expect(result?.tickInfo).toHaveProperty("duration");
    expect(result?.tickInfo).toHaveProperty("epoch");
    expect(result?.tickInfo).toHaveProperty("initialTick");
  });

  test("should fetch block height", async () => {
    const result = await chain.getBlockHeight();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("blockHeight");
    expect(result?.blockHeight).toHaveProperty("tick");
    expect(result?.blockHeight).toHaveProperty("duration");
    expect(result?.blockHeight).toHaveProperty("epoch");
    expect(result?.blockHeight).toHaveProperty("initialTick");
  });

  test("should fetch latest stats", async () => {
    const result = await chain.getLatestStats();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("data");
    expect(result?.data).toHaveProperty("timestamp");
    expect(result?.data).toHaveProperty("circulatingSupply");
    expect(result?.data).toHaveProperty("activeAddresses");
    expect(result?.data).toHaveProperty("price");
    expect(result?.data).toHaveProperty("marketCap");
    expect(result?.data).toHaveProperty("epoch");
    expect(result?.data).toHaveProperty("currentTick");
    expect(result?.data).toHaveProperty("ticksInCurrentEpoch");
    expect(result?.data).toHaveProperty("emptyTicksInCurrentEpoch");
    expect(result?.data).toHaveProperty("epochTickQuality");
    expect(result?.data).toHaveProperty("burnedQus");
  });
});
