import { QubicProvider } from "../src/provider";
import { ContractService } from "../src/contract/ContractService";
import {
  IPostQuerySmartContractBody,
  IPostQuerySmartContractResponse,
} from "../src/types";

jest.mock("../src/contract/ContractService");

describe("Contract Module", () => {
  let contract: ContractService;

  beforeAll(() => {
    const provider = new QubicProvider({
      providerUrl: "https://rpc.qubic.org",
      version: 1,
    });
    contract = new ContractService(provider, "mock-contract-address");
  });

  test("should query smart contract", async () => {
    const requestBody: IPostQuerySmartContractBody = {
      contractIndex: 0,
      inputType: 0,
      inputSize: 0,
      requestData: "string",
    };

    const mockResponse: IPostQuerySmartContractResponse = {
      responseData: "mock-data",
    };

    jest.spyOn(contract, "querySmartContract").mockResolvedValue(mockResponse);

    const result = await contract.querySmartContract(requestBody);
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("responseData");
    expect(result).toHaveProperty("responseData", "mock-data");
  });
});
