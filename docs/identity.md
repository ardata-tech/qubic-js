# Identity Module

The **Identity Module** in Qubic.js enables developers to manage identities, retrieve asset ownership details, and verify identities securely.

## 🔑 Creating an Identity

You can create a new identity using a seed string:

```javascript
const identity = await qubic.identity.createIdentity("your-secure-seed");

console.log(identity);
/*
{
  publicKey: Uint8Array,
  privateKey: Uint8Array,
  publicId: string
}
*/
```

## 💰 Fetching Account Balance

Retrieve the balance of an identity using its public ID:

```javascript
const balance = await qubic.identity.getBalanceByIdentity("PUBLIC_ID");
console.log(balance);
```

Retrieve balance by address ID:

```javascript
const balance = await qubic.identity.getBalanceByAddress("ADDRESS_ID");
console.log(balance);
```

## 📜 Getting Owned Assets

To retrieve assets owned by an identity:

```javascript
const ownedAssets = await qubic.identity.getOwnedAssets("PUBLIC_ID");
console.log(ownedAssets);
```

## 🎒 Getting Possessed Assets

To retrieve assets possessed by an identity:

```javascript
const possessedAssets = await qubic.identity.getPossessedAssets("PUBLIC_ID");
console.log(possessedAssets);
```

## 🏭 Getting Issued Assets

To retrieve assets issued by an identity:

```javascript
const issuedAssets = await qubic.identity.getIssuedAssets("PUBLIC_ID");
console.log(issuedAssets);
```

## ✅ Verifying Identity

Verify if an identity string is valid:

```javascript
const isValid = await qubic.identity.verifyIdentity("IDENTITY_STRING");
console.log(isValid); // true or false
```

## 📌 Next Steps
- [Transactions](transaction.md)
- [Utilities](utils.md)
- [QX](qx.md)
