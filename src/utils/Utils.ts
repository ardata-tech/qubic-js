export class Utils {
  static encodeData(data: string): string {
    console.log(`[Mock Utils] Encoding data: ${data}`);
    return Buffer.from(data).toString("hex");
  }

  static hashData(data: string): string {
    console.log(`[Mock Utils] Hashing data: ${data}`);
    return `mock-hash-${data}`;
  }
}