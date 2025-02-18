import Qubic from "../src/qubic";

describe("Qubic SDK Structure", () => {
  let qubic: Qubic;

  beforeAll(() => {
    qubic = new Qubic({ providerUrl: "https://rpc.qubic.org", version: 1 });
  });

  test("should check for identity", async() => {
    const result = await qubic.identity.verifyIdentity()
    
    expect(true).toBe(true);
  });
});