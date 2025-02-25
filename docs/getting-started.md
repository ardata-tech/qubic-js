# Getting Started

## 📦 Installation

To use **Qubic.js**, you can install it via **npm** or **yarn**:

```sh
# Using npm
npm install @ardata-tech/qubic-js

# Using yarn
yarn add @ardata-tech/qubic-js
```

## 🚀 Initialization

After installation, import and initialize **Qubic.js** in your project:

```javascript
import Qubic from '@ardata-tech/qubic-js';

const qubic = new Qubic({
  providerUrl: "https://rpc.qubic.org",
  version: 1,
});
```

## ⚙️ Configuration

Qubic.js allows for customizable configurations using parameters:

```javascript
const qubic = new Qubic({
  providerUrl: "https://rpc.custom-qubic.org",
  version: 2,
});
```

### Available Configuration Options

| Option        | Type   | Description                                      |
|--------------|--------|--------------------------------------------------|
| `providerUrl` | String | The URL of the Qubic RPC node.                  |
| `version`    | Number | The API version to use when making requests.    |

## ✅ Next Steps

Now that you have **Qubic.js** installed and initialized, you can explore:
- [Chain](chain.md)
- [Identity](identity.md)
- [Transactions](transaction.md)
- [Utilities](utils.md)
- [QX](qx.md)
