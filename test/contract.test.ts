import { QubicProvider } from "../src/providers/QubicProvider";
import { Contract } from "../src/contract";

describe("Contract Module", () => {
  let contract: Contract;

  beforeAll(() => {
    const provider = new QubicProvider("https://mock.qubic.org");
    contract = new Contract(provider, "mock-contract-address");
  });

  test("should query smart contract", async () => {
    const result = await contract.querySmartContract("getData", []);
    expect(result).toContain("mock-result-for-getData");
  });
});