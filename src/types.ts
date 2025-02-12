type IQubicProviderOptions = {
  providerUrl: string;
  version: number;
};

type IGetLatestTick = {
  latestTick: number | null;
};

type IGetTickData = {
  computorIndex: number;
  epoch: number;
  tickNumber: number;
  timestamp: string;
  varStruct: string;
  timeLock: string;
  transactionIds: string[];
  contractFees: string[];
  signatureHex: string;
};

type LastProcessedTick = {
  tickNumber: number;
  epoch: number;
};

type LastProcessedTicksPerEpoch = {
  [key: string]: number;
};

type SkippedTick = {
  startTick: number;
  endTick: number;
};

type Interval = {
  initialProcessedTick: number;
  lastProcessedTick: number;
};

type ProcessedTickIntervalsPerEpochItem = {
  epoch: number;
  intervals: Interval[];
};

type EmptyTicksPerEpoch = Record<string, number>;

interface IGetRpcStatus {
  lastProcessedTick: LastProcessedTick;
  lastProcessedTicksPerEpoch: LastProcessedTicksPerEpoch;
  skippedTicks: SkippedTick[];
  processedTickIntervalsPerEpoch: [ProcessedTickIntervalsPerEpochItem];
  emptyTicksPerEpoch: EmptyTicksPerEpoch;
}

interface IChainHash {
  hexDigest: string;
}

type QuorumTickStructure = {
  epoch: number;
  tickNumber: number;
  timestamp: string;
  prevResourceTestingDigestHex: string;
  prevSpectrumDigestHex: string;
  prevUniverseDigestHex: string;
  prevComputerDigestHex: string;
  txDigestHex: string;
};

type AdditionalProp = {
  saltedResourceTestingDigestHex: string;
  saltedSpectrumDigestHex: string;
  saltedUniverseDigestHex: string;
  saltedComputerDigestHex: string;
  expectedNextTickTxDigestHex: string;
  signatureHex: string;
};

type QuorumDiffPerComputor = {
  [key: string]: AdditionalProp;
};

type QuorumTickData = {
  quorumTickData: number;
  quorumTickStructure: QuorumTickStructure;
  quorumDiffPerComputor: QuorumDiffPerComputor;
};

interface IGetQuorumTickData {
  quorumTickData: QuorumTickData;
}

interface IGetHealthCheck {
  status: boolean;
}

type Computors = {
  epoch: number;
  identities: string[];
  signatureHex: string;
};

interface IGetComputors {
  computors: Computors;
}

type TickInfo = {
  tick: number;
  duration: number;
  epoch: number;
  initialTick: number;
};

interface IGetTickInfo {
  tickInfo: TickInfo;
}

type BlockHeight = {
  tick: number;
  duration: number;
  epoch: number;
  initialTick: number;
};

interface IGetBlockHeight {
  blockHeight: BlockHeight;
}


type LatestStatsData = {
  timestamp: string;
  circulatingSupply: string;
  activeAddresses: number;
  price: number;
  marketCap: string;
  epoch: number;
  currentTick: number;
  ticksInCurrentEpoch: number;
  emptyTicksInCurrentEpoch: number;
  epochTickQuality: number;
  burnedQus: string;
};

interface IGetLatestStats {
  data: LatestStatsData
}

export {
  IQubicProviderOptions,
  IGetTickInfo,
  IGetComputors,
  IGetHealthCheck,
  IGetQuorumTickData,
  IChainHash,
  IGetRpcStatus,
  IGetTickData,
  IGetLatestTick,
  IGetBlockHeight,
  IGetLatestStats,
};
