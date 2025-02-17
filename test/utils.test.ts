import { Utils } from "../src/utils";

describe("Utils Module", () => {
  test("should create a random seed", () => {
    const seed = Utils.createSeed();
    expect(seed).toBeDefined();
    expect(seed).toHaveLength(55);
    expect(seed).toMatch(/^[a-z]{55}$/);
  });

  test("should convert bytes to shifted hex", () => {
    const bytes = new Uint8Array([15, 240, 45, 200]);
    const hex = Utils.bytesToShiftedHex(bytes);
    expect(hex).toBeDefined();
    expect(typeof hex).toBe("string");
    expect(hex.length).toBe(bytes.length * 2);
  });

  test("should convert valid public key string to bytes", () => {
    const publicKeyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZAB";
    const bytes = Utils.publicKeyStringToBytes(publicKeyString);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBe(32);
  });

  test("should convert bytes32 to string", () => {
    const bytes = new Uint8Array(32);
    const str = Utils.bytes32ToString(bytes);
    expect(typeof str).toBe("string");
    expect(str.length).toBe(56);
  });

  test("should convert digest bytes to string", () => {
    const bytes = new Uint8Array(32);
    const digestStr = Utils.digestBytesToString(bytes);
    expect(typeof digestStr).toBe("string");
    expect(digestStr.length).toBe(56);
  });

  test("should convert public key bytes to string", () => {
    const bytes = new Uint8Array(32);
    const publicKeyStr = Utils.publicKeyBytesToString(bytes);
    expect(typeof publicKeyStr).toBe("string");
    expect(publicKeyStr.length).toBe(56);
  });

  test("should convert valid seed string to bytes", () => {
    const seed = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy";
    const bytes = Utils.seedStringToBytes(seed);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBe(seed.length);
  });
});
