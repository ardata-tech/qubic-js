import { UtilityService } from "../src/utils";

describe("UtilityService Module", () => {
  test("should create a random seed", () => {
    const seed = UtilityService.createSeed();
    expect(seed).toBeDefined();
    expect(seed).toHaveLength(55);
    expect(seed).toMatch(/^[a-z]{55}$/);
  });

  test("should convert bytes to shifted hex", () => {
    const bytes = new Uint8Array([15, 240, 45, 200]);
    const hex = UtilityService.bytesToShiftedHex(bytes);
    expect(hex).toBeDefined();
    expect(typeof hex).toBe("string");
    expect(hex.length).toBe(bytes.length * 2);
  });

  test("should convert valid public key string to bytes", () => {
    const publicKeyString =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCD";
    const bytes = UtilityService.publicKeyStringToBytes(publicKeyString);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBe(32);
  });

  test("should convert bytes32 to string", () => {
    const bytes = new Uint8Array(32);
    const str = UtilityService.bytes32ToString(bytes);
    expect(typeof str).toBe("string");
    expect(str.length).toBe(56);
  });

  test("should convert digest bytes to string", () => {
    const bytes = new Uint8Array(32);
    const digestStr = UtilityService.digestBytesToString(bytes);
    expect(typeof digestStr).toBe("string");
    expect(digestStr.length).toBe(56);
  });

  test("should convert public key bytes to string", () => {
    const bytes = new Uint8Array(32);
    const publicKeyStr = UtilityService.publicKeyBytesToString(bytes);
    expect(typeof publicKeyStr).toBe("string");
    expect(publicKeyStr.length).toBe(56);
  });

  test("should convert valid seed string to bytes", () => {
    const seed = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy";
    const bytes = UtilityService.seedStringToBytes(seed);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBe(seed.length);
  });

  test("should convert hex string to base26", () => {
    const hex = "0xC4aE1B5f8872D961cF6C1c9E16A3FCAe2C89e5E6";
    const base26 = UtilityService.hexToBase26(hex);
    expect(base26).toBeDefined();
    expect(typeof base26).toBe("string");
  });

  test("should convert base26 to hex string", () => {
    const base26 = "wslioomgijdjtuhrjvoswvwgjczbnikuve";
    const hex = UtilityService.base26ToHex(base26);
    expect(hex).toBeDefined();
    expect(typeof hex).toBe("string");
  });
});
