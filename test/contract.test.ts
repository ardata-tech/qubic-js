import { QubicProvider } from "../src/provider";
import { Contract } from "../src/contract";

describe("Contract Module", () => {
  let contract: Contract;

  beforeAll(() => {
    const provider = new QubicProvider({providerUrl:"https://rpc.qubic.org",version:1});
    contract = new Contract(provider, "mock-contract-address");
  });

  test("should query smart contract", async () => {
    const result = await contract.querySmartContract({
      contractIndex: 0,
      inputType: 0,
      inputSize: 0,
      requestData: "string"
    });
    expect(result).toContain("mock-result-for-getData");
  });
});