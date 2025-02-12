import { QubicProvider } from "../src/providers/QubicProvider";
import { Chain } from "../src/chain";

describe("Chain Module", () => {
  let chain: Chain;

  beforeAll(() => {
    const provider = new QubicProvider({ providerUrl: 'https://rpc.qubic.org', version: 1});
    chain = new Chain(provider);
  });

  test("should fetch latest tick", async () => {
    const latestTick = await chain.getLatestTick();
      expect(typeof latestTick)
      .toBe("number");
  });

  // test("should fetch tick data", async () => {
  //   const tickData = await chain.getTickData("mock-tick");
  //   expect(tickData).toHaveProperty("data", "mock-tick-data");
  // });

  // test("should fetch RPC status", async () => {
  //   const rpcStatus = await chain.getRpcStatus();
  //   expect(rpcStatus).toHaveProperty("status", "mock-rpc-status");
  // });

  // test("should fetch chain hash", async () => {
  //   const chainHash = await chain.getChainHash();
  //   expect(chainHash).toBe("mock-chain-hash");
  // });

  // test("should fetch quorum tick data", async () => {
  //   const quorumTickData = await chain.getQuorumTickData();
  //   expect(quorumTickData).toHaveProperty("quorum", "mock-quorum-tick-data");
  // });

  // test("should fetch store hash", async () => {
  //   const storeHash = await chain.getStoreHash();
  //   expect(storeHash).toBe("mock-store-hash");
  // });

  // test("should perform health check", async () => {
  //   const healthCheck = await chain.getHealthCheck();
  //   expect(healthCheck).toHaveProperty("status", "healthy");
  // });

  // test("should fetch computors", async () => {
  //   const computors = await chain.getComputors();
  //   expect(computors).toHaveLength(2);
  // });

  // test("should fetch tick info", async () => {
  //   const tickInfo = await chain.getTickInfo("mock-tick");
  //   expect(tickInfo).toHaveProperty("info", "mock-tick-info");
  // });

  // test("should fetch block height", async () => {
  //   const blockHeight = await chain.getBlockHeight();
  //   expect(blockHeight).toBe(1050000);
  // });

  // test("should fetch latest stats", async () => {
  //   const latestStats = await chain.getLatestStats();
  //   expect(latestStats).toHaveProperty("stats", "mock-latest-stats");
  // });
});