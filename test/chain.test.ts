import { QubicProvider } from "../src/providers/QubicProvider";
import { Chain } from "../src/chain";

describe("Chain Module", () => {
  let chain: Chain;

  beforeAll(() => {
    const provider = new QubicProvider("https://mock.qubic.org");
    chain = new Chain(provider);
  });

  test("should fetch block height", async () => {
    const blockHeight = await chain.getBlockHeight();
    expect(blockHeight).toBe(1050000);
  });

  test("should fetch block data", async () => {
    const blockNumber = 100;
    const block = await chain.getBlock(blockNumber);
    expect(block).toHaveProperty("blockNumber", blockNumber);
    expect(block).toHaveProperty("transactions");
  });

  test("should fetch network info", async () => {
    const networkInfo = await chain.getNetworkInfo();
    expect(networkInfo).toHaveProperty("chainId", "qubic-mainnet");
  });

  test("should fetch peer count", async () => {
    const peerCount = await chain.getPeerCount();
    expect(peerCount).toBe(8);
  });

  test("should fetch gas price", async () => {
    const gasPrice = await chain.getGasPrice();
    expect(gasPrice).toBe(20);
  });
});