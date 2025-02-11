import Qubic from "../src/qubic";

describe("Qubic SDK Structure", () => {
  let qubic: Qubic;

  beforeAll(() => {
    qubic = new Qubic("https://mock.qubic.org");
  });

  test("should initialize with a provider", () => {
    expect(qubic.provider).toBeDefined();
  });

  test("should set a new provider", () => {
    qubic.setProvider("https://new.mock.qubic.org");
    expect(qubic.provider).toBeDefined();
  });
});