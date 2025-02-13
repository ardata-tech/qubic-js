export class Utils {
  static encodeData(data: string): string {
    return Buffer.from(data).toString("hex");
  }

  static hashData(data: string): string {
    return `mock-hash-${data}`;
  }
}