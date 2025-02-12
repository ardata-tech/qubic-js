export type IQubicProviderOptions =  {
    providerUrl: string;
    version: number;
}

export type IChainGetLatestTick = {
    latestTick: number | null;
} 

export type IChainGetTickData = {
  computorIndex: number;
  epoch: number;
  tickNumber: number;
  timestamp: string;
  varStruct: string;
  timeLock: string;
  transactionIds: [string];
  contractFees: [];
  signatureHex: string;
};

type LastProcessedTick= {
  tickNumber: number;
  epoch: number;
}

type LastProcessedTicksPerEpoch = Record<string, number>

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
  intervals: [Interval];
};

type EmptyTicksPerEpoch = Record<string, number>

export interface IChainGetRpcStatus {
  lastProcessedTick: LastProcessedTick;
  lastProcessedTicksPerEpoch: LastProcessedTicksPerEpoch;
  skippedTicks: [SkippedTick];
  processedTickIntervalsPerEpoch: [ProcessedTickIntervalsPerEpochItem];
  emptyTicksPerEpoch: EmptyTicksPerEpoch;
};

export interface IChainHash {
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

type QuorumDiffPerComputor = Record<string, AdditionalProp>

type QuorumTickData = {
  quorumTickData: number;
  quorumTickStructure: QuorumTickStructure;
  quorumDiffPerComputor: QuorumDiffPerComputor;
};

export interface IGetQuorumTickData {
  quorumTickData: QuorumTickData;
}

export interface IGetHealthCheck{
  status: boolean
}

type Computors = {
  epoch: number;
  identities: [string];
  signatureHex:string
};

export interface IGetComputors {
  computors: Computors;
}