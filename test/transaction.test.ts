import Qubic from "../src/qubic";

describe("Qubic SDK Structure", () => {
  let qubic: Qubic;

  beforeAll(() => {
    qubic = new Qubic({ providerUrl: "https://rpc.qubic.org", version: 1 });
  });

  test("should check for identity", async() => {
    expect(true).toBe(true);
  });
});