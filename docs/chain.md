# Chain Module

The **Chain Module** in Qubic.js allows developers to query blockchain data, fetch tick information, retrieve RPC statuses, and monitor chain health.

## ⏳ Fetching Latest Tick

Retrieve the latest tick of the chain:

```javascript
const latestTick = await qubic.chain.getLatestTick();
console.log(latestTick);
```

## 📊 Fetching Tick Data

Fetch details about a specific tick:

```javascript
const tickData = await qubic.chain.getTickData(1000);
console.log(tickData);
```

## 🔄 Checking RPC Status

Retrieve the current status of the Qubic RPC node:

```javascript
const rpcStatus = await qubic.chain.getRpcStatus();
console.log(rpcStatus);
```

## 🔗 Getting Computors

Fetch the list of computors for a specific epoch:

```javascript
const computors = await qubic.chain.getComputors(5);
console.log(computors);
```

## 🔑 Getting Chain Hash

Retrieve the chain hash for a given tick number:

```javascript
const chainHash = await qubic.chain.getChainHash(1000);
console.log(chainHash);
```

## 🏪 Fetching Store Hash

Retrieve the store hash for a given tick number:

```javascript
const storeHash = await qubic.chain.getStoreHash(1000);
console.log(storeHash);
```

## 🩺 Health Check

Check the health status of the Qubic network:

```javascript
const healthCheck = await qubic.chain.getHealthCheck();
console.log(healthCheck);
```

## 📏 Block Height

Get the current block height of the chain:

```javascript
const blockHeight = await qubic.chain.getBlockHeight();
console.log(blockHeight);
```

## 📈 Latest Statistics

Retrieve the latest blockchain statistics:

```javascript
const latestStats = await qubic.chain.getLatestStats();
console.log(latestStats);
```

## 📌 Next Steps
- [Identity](identity.md)
- [Transactions](transaction.md)
- [Utilities](utils.md)
- [QX](qx.md)

