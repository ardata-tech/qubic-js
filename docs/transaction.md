# Transaction Module

The **Transaction Module** in Qubic.js provides methods for creating, signing, encoding, and broadcasting transactions on the Qubic network.

## 💰 Creating a Transaction

Create a transaction by specifying the sender, receiver, amount, and tick:

```javascript
const transaction = await qubic.transaction.createTransaction(
  "SENDER_WALLET_ADDRESS",
  "RECEIVER_WALLET_ADDRESS",
  1000, // Amount
  5000  // Target tick
);
console.log(transaction);
```

## ✍️ Signing a Transaction

Sign a transaction using the sender’s private key:

```javascript
const signedTransaction = await qubic.transaction.signTransaction(
  transaction,
  privateKey
);
console.log(signedTransaction);
```

## 🔐 Encoding Transactions

Encode a signed transaction into a base64 string for broadcasting:

```javascript
const encodedTransaction = qubic.transaction.encodeTransactionToBase64(signedTransaction);
console.log(encodedTransaction);
```

## 📡 Broadcasting a Transaction

Broadcast the encoded transaction to the Qubic network:

```javascript
const response = await qubic.transaction.broadcastTransaction(encodedTransaction);
console.log(response);
```

## ✅ Getting Approved Transactions

Retrieve a list of approved transactions for a specific tick:

```javascript
const approvedTransactions = await qubic.transaction.getApprovedTransactions(5000);
console.log(approvedTransactions);
```

## 📜 Fetching Transaction Status

Check the status of a specific transaction:

```javascript
const transactionStatus = await qubic.transaction.getTransactionsStatus("TRANSACTION_ID");
console.log(transactionStatus);
```

## 🔍 Retrieving Transaction Details

Fetch detailed information about a transaction:

```javascript
const transactionDetails = await qubic.transaction.getTransactions("TRANSACTION_ID");
console.log(transactionDetails);
```

## 🔄 Getting Transfer Transactions

Retrieve transfer transactions for a specific identity:

```javascript
const transferTransactions = await qubic.transaction.getTransferTransactions("IDENTITY");
console.log(transferTransactions);
```

## 📌 Next Steps
- [Interacting with QX](qx.md)
