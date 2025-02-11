import { Utils } from "../src/utils";

describe("Utils Module", () => {
  test("should encode data using utils", () => {
    const encodedData = Utils.encodeData("some data");
    expect(encodedData).toBe("736f6d652064617461"); // "some data" in hex
  });

  test("should hash data using utils", () => {
    const hashedData = Utils.hashData("some data");
    expect(hashedData).toBe("mock-hash-some data");
  });
});