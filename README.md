# Qubic.js

**Qubic.js** is an NPM library designed to facilitate seamless interaction with the **Qubic network**. This library enables developers to connect their applications to the Qubic blockchain efficiently.

## Features

- 🛠 **Easy Integration** – Connect your application to the Qubic network with minimal setup.
- 🔒 **Secure Transactions** -  Sign and verify transactions with advanced cryptographic security.
- 📺 **Smart Contract Interaction** – Read and write data on Qubic smart contracts.
- ⚡ **Efficient Performance** – Optimized connection handling and transaction execution.

---

## 📦 Installation

You can install **Qubic.js** via **npm** or **yarn**:

```sh
# Using npm
npm install @ardata-tech/qubic-js

# Using yarn
yarn add @ardata-tech/qubic-js
```

---

## 🚀 Getting Started

### Import the Library

```javascript
import Qubic from '@ardata-tech/qubic-js';
```

### Initialize the Connection

```javascript
const qubic = new Qubic({
  providerUrl: "https://rpc.qubic.org",
  version: 1,
});
```

---

## 💡 Fetching Account Balance

```javascript
const response = await qubic.identity.getBalanceByAddress(
  walletAddress,
);
```

---

## 💰 Sending Transactions

```javascript
// Create a transaction
const transaction = await qubic.transaction.createTransaction(
  fromWalletAddress,
  toWalletAddress,
  amount,
  targetTick,
)

// Sign the transaction
const signedTransaction = await qubic.transaction.signTransaction(
  transaction,
  privateKey,
)

// Encode the transaction to base64
const encodedTransaction = qubic.transaction.encodeTransactionToBase64(signedTransaction)

// Broadcast the transaction
const response = await qubic.transaction.broadcastTransaction(encodedTransaction);
```

---

## 💜 Smart Contract Interaction

### Reading Data from a Smart Contract

```javascript
// Coming soon
```

### Writing Data to a Smart Contract

```javascript
// Coming soon
```

---

## 🛠 Development

### Clone the Repository

```sh
git clone https://github.com/ardata-tech/qubic-js.git
cd qubic-js
```

### Install Dependencies

```sh
npm install
```

### Run Tests

```sh
npm test
```

### Run Example Scripts

```sh
npx ts-node examples/identity/createIdentity.ts
```

---

## 🌐 Links

- [Qubic Network](https://qubic.org/)

---
