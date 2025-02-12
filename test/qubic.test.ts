import Qubic from "../src/qubic";

describe("Qubic SDK Structure", () => {
  let qubic: Qubic;

  beforeAll(() => {
    qubic = new Qubic({ providerUrl: "https://rpc.qubic.org", version: 1 });
  });

  test("should initialize with a provider", () => {
    expect(qubic.provider).toBeDefined();
  });

  test("should set a new provider", () => {
    qubic.setProvider({ providerUrl: "https://rpc.qubic.org", version: 1 });
    expect(qubic.provider).toBeDefined();
  });
});