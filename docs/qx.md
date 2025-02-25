# QX Module

The **QX Module** in Qubic.js provides methods to interact with the QX market, including retrieving ask/bid orders and fetching transaction fees.

## 📈 Fetching Ask Orders

Retrieve ask orders for a specific asset and issuer:

```javascript
const askOrders = await qubic.qx.getAskOrders(
  "ASSET_NAME",
  "ISSUER_ID",
  "0" // Offset for pagination
);
console.log(askOrders);
```

## 📉 Fetching Bid Orders

Retrieve bid orders for a specific asset and issuer:

```javascript
const bidOrders = await qubic.qx.getAssetBidOrders(
  "ASSET_NAME",
  "ISSUER_ID",
  "0" // Offset for pagination
);
console.log(bidOrders);
```

## 🏦 Fetching Entity Ask Orders

Retrieve ask orders for a specific entity:

```javascript
const entityAskOrders = await qubic.qx.getEntityAskOrders(
  "ENTITY_ID",
  "0" // Offset for pagination
);
console.log(entityAskOrders);
```

## 💵 Fetching Entity Bid Orders

Retrieve bid orders for a specific entity:

```javascript
const entityBidOrders = await qubic.qx.getEntityBidOrders(
  "ENTITY_ID",
  "0" // Offset for pagination
);
console.log(entityBidOrders);
```

## 💰 Fetching QX Fees

Retrieve the transaction fees associated with QX operations:

```javascript
const qxFees = await qubic.qx.getFees();
console.log(qxFees);
```

## 📌 Next Steps
- [Development & Contribution](development.md)
