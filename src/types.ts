type IQubicProviderOptions = {
  providerUrl: string;
  version: number;
};

type IGetLatestTick = {
  latestTick: number | null;
};

type TickData = {
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

type IGetTickData = {
  tickData: TickData;
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

            
interface IPostQuerySmartContractBody {
  contractIndex: number;
  inputType: number;
  inputSize: number;
  requestData: string;
}

interface IPostQuerySmartContractResponse {
  responseData: string;
}

interface IBroadcastTransactionResponse {
  peersBroadcasted: number;
  encodedTransaction: string;
  transactionId: string;
}

type Balance = {
  id: string;
  balance: string;
  validForTick: number;
  latestIncomingTransferTick: number;
  latestOutgoingTransferTick: number;
  incomingAmount: string;
  outgoingAmount: string;
  numberOfIncomingTransfers: number;
  numberOfOutgoingTransfers: number;
};

interface IGetBalanceByIdentity {
  balance: Balance;
}

/**
 * TODO:
 * this is not yet finalized
 * need to get the actual response to map it to the interface
*/
interface IGetPossessedAssets {
  possessedAssets: []
}

/**
 * TODO:
 * this is not yet finalized
 * need to get the actual response to map it to the interface
*/
interface IGetIssuedAssets {
  issuedAssets: []
} 

type ApprovedTransactions = {
  sourceId: string;
  destId: string;
  amount: string;
  tickNumber: number;
  inputType: number;
  inputSize: number;
  inputHex: string;
  signatureHex: string;
  txId: string;
};

interface IGetApproveTransactions {
  approvedTransactions: ApprovedTransactions[];
}

type TransactionStatus = {
  txId: string;
  moneyFlew: boolean;
};
    
interface IGetTransactionsStatus{
  transactionStatus:TransactionStatus
}

type Transaction = {
  sourceId: string;
  destId: string;
  amount: string;
  tickNumber: number;
  inputType: number;
  inputSize: number;
  inputHex: string;
  signatureHex: string;
  txId: string;
};
    
interface IGetTransaction{
  transaction: Transaction
}

/**
 * TODO:
 * this is not yet finalized
 * need to get the actual transferTransactionsPerTick to map it to the interface
*/

interface IGetTransferTransaction{
  transferTransactionsPerTick:[]
}

interface IGetOwnedAssets {
  ownedAssets:[]
}

interface ITransactionBuilderPayload {
   issuer: string
    assetName: number | bigint | Uint8Array
    price: number | bigint | Uint8Array  
    numberOfShares: number | bigint | Uint8Array 
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
  IPostQuerySmartContractBody,
  IPostQuerySmartContractResponse,
  IBroadcastTransactionResponse,
  IGetBalanceByIdentity,
  IGetPossessedAssets,
  IGetIssuedAssets,
  IGetApproveTransactions,
  IGetTransactionsStatus,
  IGetTransaction,
  IGetTransferTransaction,
  IGetOwnedAssets,
  ITransactionBuilderPayload,
};
