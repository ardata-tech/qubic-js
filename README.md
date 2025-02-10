# Qubic Connect

**Qubic Connect** is an NPM library designed to facilitate seamless interaction with the **Qubic network**, featuring built-in support for **MetaMask Snap**. This library enables developers to connect their applications to the Qubic blockchain efficiently while leveraging MetaMask’s enhanced security and user-friendly interface.

## Features

- 🛠 **Easy Integration** – Connect your application to the Qubic network with minimal setup.
- 🔗 **MetaMask Snap Support** – Interact with Qubic blockchain seamlessly via MetaMask.
- 🔒 **Secure Transactions** – Leverage MetaMask Snap for enhanced security when signing transactions.
- 📺 **Smart Contract Interaction** – Read and write data on Qubic smart contracts.
- ⚡ **Efficient Performance** – Optimized connection handling and transaction execution.

---

## 📦 Installation

You can install **Qubic Connect** via **npm** or **yarn**:

```sh
# Using npm
npm install qubic-connect

# Using yarn
yarn add qubic-connect
```

---

## 🚀 Getting Started

### Import the Library

```javascript
import QubicConnect from 'qubic-connect';
```

### Initialize the Connection

```javascript
const qubic = new QubicConnect({
  network: 'mainnet', // Options: 'mainnet', 'testnet'
  snapId: 'npm:@qubic/metamask-snap', // MetaMask Snap integration
});

await qubic.connect();
console.log('Connected:', qubic.isConnected());
```

---

## 🔑 Connecting Wallet

To request connection to the Qubic network via MetaMask:

```javascript
async function connectWallet() {
  try {
    const accounts = await qubic.requestAccounts();
    console.log('Connected accounts:', accounts);
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
}
```

---

## 💡 Fetching Account Balance

```javascript
async function getBalance() {
  const balance = await qubic.getBalance();
  console.log('Qubic Balance:', balance);
}
```

---

## 💰 Sending Transactions

```javascript
async function sendTransaction() {
  const txHash = await qubic.sendTransaction({
    to: '0xRecipientAddress',
    value: '1000000000000000000', // 1 Qubic in Wei
  });

  console.log('Transaction Hash:', txHash);
}
```

---

## 💜 Smart Contract Interaction

### Reading Data from a Smart Contract

```javascript
const contract = qubic.getContract({
  address: '0xSmartContractAddress',
  abi: [
    {
      "constant": true,
      "inputs": [],
      "name": "getValue",
      "outputs": [{ "name": "", "type": "uint256" }],
      "type": "function",
    },
  ],
});

async function readContract() {
  const value = await contract.methods.getValue().call();
  console.log('Contract Value:', value);
}
```

### Writing Data to a Smart Contract

```javascript
async function writeContract() {
  const txHash = await contract.methods.setValue(42).send();
  console.log('Transaction Hash:', txHash);
}
```

---

## 📝 API Reference

### `new QubicConnect(options)`
Creates a new Qubic Connect instance.

- `options.network` - (`'mainnet' | 'testnet'`) Network selection.
- `options.snapId` - MetaMask Snap identifier.

### `qubic.connect()`
Connects to the Qubic network.

### `qubic.requestAccounts()`
Requests wallet connection via MetaMask Snap.

### `qubic.getBalance()`
Fetches the user's Qubic token balance.

### `qubic.sendTransaction(tx)`
Sends a Qubic transaction.

- `tx.to` - Recipient address.
- `tx.value` - Amount in Wei.

### `qubic.getContract(options)`
Returns a contract instance for interaction.

- `options.address` - Smart contract address.
- `options.abi` - Smart contract ABI.

---

## 📌 Requirements

- Node.js 14+
- MetaMask installed with Snap support

---

## 🛠 Development

### Clone the Repository

```sh
git clone https://github.com/your-repo/qubic-connect.git
cd qubic-connect
npm install
```

### Run Tests

```sh
npm test
```

---

## 🌐 Links

- [Qubic Network](https://qubic.org/)
- [MetaMask Snaps](https://metamask.io/snaps/)

---
