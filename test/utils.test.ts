import { Utils } from "../src/utils";

describe("Utils Module", () => {
  test("should create a random seed", () => {
    const seed = Utils.createSeed();
    expect(seed).toBeDefined();
    expect(seed).toHaveLength(55);
    expect(seed).toMatch(/^[a-z]{55}$/);
  });

  test("should convert a seed to bytes", () => {
    const seed = Utils.createSeed();
    const bytes = Utils.seedToBytes(seed);
    expect(bytes).toBeDefined();
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes).toHaveLength(seed.length);
  });
});