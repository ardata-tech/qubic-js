import { Utils } from "../src/utils";

describe("Utils Module", () => {
  test("should create a random seed", () => {
    const seed = Utils.createSeed();
    expect(seed).toBeDefined();
    expect(seed).toHaveLength(55);
    expect(seed).toMatch(/^[a-z]{55}$/);
  });
});