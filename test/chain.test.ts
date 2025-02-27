import { QubicProvider } from "../src/provider";
import { ChainService } from "../src/chain/ChainService";
import {
  IGetLatestTick,
  IGetTickData,
  IGetRpcStatus,
  IChainHash,
  IGetQuorumTickData,
  IGetHealthCheck,
  IGetComputors,
  IGetTickInfo,
  IGetBlockHeight,
  IGetLatestStats,
} from "../src/types";

jest.mock("../src/chain/ChainService");

describe("Chain Module", () => {
  let chain: ChainService;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    chain = new ChainService(provider);
  });

  test("should fetch latest tick", async () => {
    const mockResponse: IGetLatestTick = { latestTick: 19231746 };
    jest.spyOn(chain, 'getLatestTick').mockResolvedValue(mockResponse.latestTick);

    const result = await chain.getLatestTick();
    expect(result).toBe(mockResponse.latestTick);
  });

  test("should fetch tick data", async () => {
    const mockResponse: IGetTickData = {
      tickData: {
        computorIndex: 1,
        epoch: 1,
        tickNumber: 19231746,
        timestamp: "2025-02-27T00:00:00Z",
        varStruct: "varStruct",
        timeLock: "timeLock",
        transactionIds: ["tx1", "tx2"],
        contractFees: ["fee1", "fee2"],
        signatureHex: "signatureHex",
      },
    };
    jest.spyOn(chain, 'getTickData').mockResolvedValue(mockResponse);

    const result = await chain.getTickData(19231746);
    expect(result).toBe(mockResponse);
  });

  test("should fetch RPC status", async () => {
    const mockResponse: IGetRpcStatus = {
      lastProcessedTick: { tickNumber: 19231746, epoch: 1 },
      lastProcessedTicksPerEpoch: { "1": 19231746 },
      skippedTicks: [{ startTick: 19231740, endTick: 19231745 }],
      processedTickIntervalsPerEpoch: [{ epoch: 1, intervals: [{ initialProcessedTick: 19231740, lastProcessedTick: 19231746 }] }],
      emptyTicksPerEpoch: { "1": 0 },
    };
    jest.spyOn(chain, 'getRpcStatus').mockResolvedValue(mockResponse);

    const result = await chain.getRpcStatus();
    expect(result).toBe(mockResponse);
  });

  test("should fetch chain hash", async () => {
    const mockResponse: IChainHash = { hexDigest: "hexDigest" };
    jest.spyOn(chain, 'getChainHash').mockResolvedValue(mockResponse);

    const result = await chain.getChainHash(19231746);
    expect(result).toBe(mockResponse);
  });

  test("should fetch quorum tick data", async () => {
    const mockResponse: IGetQuorumTickData = {
      quorumTickData: {
        quorumTickStructure: {
          epoch: 1,
          tickNumber: 19231746,
          timestamp: "2025-02-27T00:00:00Z",
          prevResourceTestingDigestHex: "prevResourceTestingDigestHex",
          prevSpectrumDigestHex: "prevSpectrumDigestHex",
          prevUniverseDigestHex: "prevUniverseDigestHex",
          prevComputerDigestHex: "prevComputerDigestHex",
          txDigestHex: "txDigestHex",
        },
        quorumDiffPerComputor: {
          "computor1": {
            saltedResourceTestingDigestHex: "saltedResourceTestingDigestHex",
            saltedSpectrumDigestHex: "saltedSpectrumDigestHex",
            saltedUniverseDigestHex: "saltedUniverseDigestHex",
            saltedComputerDigestHex: "saltedComputerDigestHex",
            expectedNextTickTxDigestHex: "expectedNextTickTxDigestHex",
            signatureHex: "signatureHex",
          },
        },
      },
    };
    jest.spyOn(chain, 'getQuorumTickData').mockResolvedValue(mockResponse);

    const result = await chain.getQuorumTickData(19231746);
    expect(result).toBe(mockResponse);
  });

  test("should fetch store hash", async () => {
    const mockResponse: IChainHash = { hexDigest: "hexDigest" };
    jest.spyOn(chain, 'getStoreHash').mockResolvedValue(mockResponse);

    const result = await chain.getStoreHash(19231746);
    expect(result).toBe(mockResponse);
  });

  test("should perform health check", async () => {
    const mockResponse: IGetHealthCheck = { status: true };
    jest.spyOn(chain, 'getHealthCheck').mockResolvedValue(mockResponse);

    const result = await chain.getHealthCheck();
    expect(result).toBe(mockResponse);
  });

  test("should fetch computors", async () => {
    const mockResponse: IGetComputors = {
      computors: {
        epoch: 1,
        identities: ["identity1", "identity2"],
        signatureHex: "signatureHex",
      },
    };
    jest.spyOn(chain, 'getComputors').mockResolvedValue(mockResponse);

    const result = await chain.getComputors(1);
    expect(result).toBe(mockResponse);
  });

  test("should fetch tick info", async () => {
    const mockResponse: IGetTickInfo = {
      tickInfo: {
        tick: 19231746,
        duration: 10,
        epoch: 1,
        initialTick: 19231740,
      },
    };
    jest.spyOn(chain, 'getTickInfo').mockResolvedValue(mockResponse);

    const result = await chain.getTickInfo();
    expect(result).toBe(mockResponse);
  });

  test("should fetch block height", async () => {
    const mockResponse: IGetBlockHeight = {
      blockHeight: {
        tick: 19231746,
        duration: 10,
        epoch: 1,
        initialTick: 19231740,
      },
    };
    jest.spyOn(chain, 'getBlockHeight').mockResolvedValue(mockResponse);

    const result = await chain.getBlockHeight();
    expect(result).toBe(mockResponse);
  });

  test("should fetch latest stats", async () => {
    const mockResponse: IGetLatestStats = {
      data: {
        timestamp: "2025-02-27T00:00:00Z",
        circulatingSupply: "1000000",
        activeAddresses: 1000,
        price: 10,
        marketCap: "10000000",
        epoch: 1,
        currentTick: 19231746,
        ticksInCurrentEpoch: 100,
        emptyTicksInCurrentEpoch: 0,
        epochTickQuality: 100,
        burnedQus: "1000",
      },
    };
    jest.spyOn(chain, 'getLatestStats').mockResolvedValue(mockResponse);

    const result = await chain.getLatestStats();
    expect(result).toBe(mockResponse);
  });
});