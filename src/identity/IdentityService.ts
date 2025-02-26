import crypto from "../crypto";
import { QubicBase } from "../base";
import { QubicProvider } from "../provider";
import {
  IGetBalanceByIdentity,
  IGetIssuedAssets,
  IGetOwnedAssets,
  IGetPossessedAssets,
} from "../types";

export class IdentityService extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
  }

  /**
   * Retrieves the list of assets owned by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch owned assets.
   * @returns {Promise<IGetOwnedAssets>} A promise that resolves to the list of owned assets.
   */
  async getOwnedAssets(identity: string): Promise<IGetOwnedAssets> {
    try {
      return await this.httpClient.call<IGetOwnedAssets>(
        `/${this.version}/assets/${identity}/owned`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch owned assets for identity ${identity}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves the list of assets possessed by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch possessed assets.
   * @returns {Promise<IGetPossessedAssets>} A promise that resolves to the list of possessed assets.
   */
  async getPossessedAssets(identity: string): Promise<IGetPossessedAssets> {
    try {
      return await this.httpClient.call<IGetPossessedAssets>(
        `/${this.version}/assets/${identity}/possessed`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch possessed assets for identity ${identity}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves the list of assets issued by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch issued assets.
   * @returns {Promise<IGetIssuedAssets>} A promise that resolves to the list of issued assets.
   */
  async getIssuedAssets(identity: string): Promise<IGetIssuedAssets> {
    try {
      return await this.httpClient.call<IGetIssuedAssets>(
        `/${this.version}/assets/${identity}/issued`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch issued assets for identity ${identity}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Fetches the balance of a specific address ID.
   *
   * @param {string} addressID The address ID for which to fetch the balance.
   * @returns {Promise<any>} A promise that resolves to the balance.
   */
  async getBalanceByAddress(addressID: string): Promise<any> {
    try {
      return await this.httpClient.call(
        `/${this.version}/balances/${addressID}`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch balance for address ID ${addressID}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Retrieves the balance of a specific identity.
   *
   * @param {string} Id The identity for which to fetch the balance.
   * @returns {Promise<IGetBalanceByIdentity>} A promise that resolves to the balance.
   */
  async getBalanceByIdentity(Id: string): Promise<IGetBalanceByIdentity> {
    try {
      return await this.httpClient.call<IGetBalanceByIdentity>(
        `/${this.version}/balances/${Id}`,
        "GET",
      );
    } catch (error) {
      throw new Error(
        `Failed to fetch balance for identity ${Id}: ${(error as any).message}`,
      );
    }
  }

  /**
   * Creates a new identity package containing a public key, private key, and public identity string.
   * The identity package is generated from a seed string using the K12 hash function.
   *
   * @param {string} seed - The seed string used to generate the identity.
   * @returns {Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }>} identity - The generated identity package.
   */
  async createIdentity(seed: string): Promise<{
    publicKey: Uint8Array;
    privateKey: Uint8Array;
    publicId: string;
  }> {
    const identity = await this.createIdPackage(seed);
    return identity;
  }

  /**
   * Loads an identity package from a private key byte array.
   * The identity package contains a public key, private key, and public identity string.
   *
   * @param {Uint8Array} privateKey - The private key as a byte array.
   * @returns {Promise<{ publicKey: Uint8Array, privateKey: Uint8Array, publicId: string }>} identity - The generated identity package.
   */
  async loadIdentityFromPrivateKey(privateKey: Uint8Array): Promise<{
    publicKey: Uint8Array;
    privateKey: Uint8Array;
    publicId: string;
  }> {
    const { schnorrq } = await crypto;
    // Derive the public key from the private key
    const publicKey = schnorrq.generatePublicKey(privateKey);

    // Compute the public identity from the public key
    const publicId = await this.getIdentity(publicKey);

    return { publicKey, privateKey, publicId };
  }

  /**
   * Verifies whether an identity string is valid by checking its length,
   * ensuring it contains only uppercase letters, and comparing it with
   * the derived identity from its public key.
   *
   * @param {string} identity - The identity string to verify.
   * @returns {Promise<boolean>} - Returns `true` if the identity is valid, otherwise `false`.
   */
  public async verifyIdentity(identity: string): Promise<boolean> {
    if (!identity || identity.length !== 60 || !/^[A-Z]+$/.test(identity)) {
      return false;
    }

    // Convert the identity string into its public key bytes
    const publicKey = this.getIdentityBytes(identity);

    // Derive the identity from the public key
    const idFromBytes = await this.getIdentity(publicKey);

    // Compare the original identity with the derived one
    return identity === idFromBytes;
  }
}
