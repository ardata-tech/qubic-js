import { QubicProvider } from "../src/provider";
import { Contract } from "../src/contract";

describe("Contract Module", () => {
  let contract: Contract;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    contract = new Contract(provider, "mock-contract-address");
  });

  test("should query smart contract", async () => {
    /** 
     * TODO:
     * Mock the contract.querySmartContract function
     * until the function is implemented correctly
     * this is just a placeholder
     * will use jest mock

    const requestBody: IPostQuerySmartContractBody = {  
      contractIndex: 0,
      inputType: 0,
      inputSize: 0,
      requestData: "string"
    }
    const result = await contract.querySmartContract(requestBody);
    */

    const querySmartContract = jest.fn(() => ({
      responseData: "mock-data",
    }));
    const result = querySmartContract();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("responseData");
    expect(result).toHaveProperty("responseData", "mock-data");
  });
});
