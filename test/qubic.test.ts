import Qubic from "../src/core";

describe("Qubic SDK Structure", () => {
  let qubic: Qubic;

  beforeAll(() => {
    qubic = new Qubic({ providerUrl: "https://rpc.qubic.org", version: 1 });
  });

  test("should initialize with a provider", () => {
    expect(qubic).toBeDefined();
  });
});
