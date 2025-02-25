# Development & Contribution

The **Development & Contribution** guide provides instructions on setting up the development environment, running tests, and executing example scripts for Qubic.js.

## 🛠 Setting Up the Development Environment

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/ardata-tech/qubic-js.git
cd qubic-js
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Build the Project

```sh
npm run build
```

## ✅ Running Tests

Execute unit and integration tests to ensure everything is working correctly:

```sh
npm test
```

Run tests with detailed output:

```sh
npm run test:verbose
```

## 📜 Example Scripts

Run example scripts using **ts-node**:

```sh
npx ts-node examples/identity/createIdentity.ts
```

Example scripts available on `/examples` folder.

## 📥 Contributing

We welcome contributions from the community! To contribute:

1. **Fork the repository** on GitHub.
2. **Create a new branch** for your feature or bug fix:
   ```sh
   git checkout -b feature/new-feature
   ```
3. **Make changes and commit**:
   ```sh
   git commit -m "Add new feature"
   ```
4. **Push changes to your fork**:
   ```sh
   git push origin feature/new-feature
   ```
5. **Open a pull request** on the main repository.
