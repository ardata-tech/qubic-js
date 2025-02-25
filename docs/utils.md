# Utilities Module

The **Utilities Module** in Qubic.js provides essential helper functions for generating seeds, encoding/decoding transactions, and converting public keys.

## 🔑 Creating a Secure Seed

Generate a secure 55-character lowercase seed:

```javascript
const seed = qubic.utils.createSeed();
console.log(seed); // Randomly generated seed
```

## 🔄 Encoding & Decoding Transactions

Encode a transaction into a base64 string:

```javascript
const encodedTransaction = qubic.utils.encodeTransactionToBase64(signedTransaction);
console.log(encodedTransaction);
```

## 🔢 Converting Public Keys

Convert a public key from string format to a byte array:

```javascript
const publicKeyBytes = qubic.utils.publicKeyStringToBytes("PUBLIC_KEY_STRING");
console.log(publicKeyBytes);
```

Convert a public key byte array back to a string:

```javascript
const publicKeyString = qubic.utils.publicKeyBytesToString(publicKeyBytes);
console.log(publicKeyString);
```

## 🔤 Hexadecimal & Base26 Conversions

Convert a hexadecimal string to base26:

```javascript
const base26String = qubic.utils.hexToBase26("0xabcdef");
console.log(base26String);
```

Convert a base26 string back to hexadecimal:

```javascript
const hexString = qubic.utils.base26ToHex("base26String");
console.log(hexString);
```

## 📌 Next Steps
- [QX](qx.md)
- [Development & Contribution](development.md)
