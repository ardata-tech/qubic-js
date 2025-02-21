import crypto from '../crypto';
import { QubicBase } from "../base";
import { QubicProvider } from "../provider";
import {
  IGetBalanceByIdentity,
  IGetIssuedAssets,
  IGetOwnedAssets,
  IGetPossessedAssets,
} from "../types";

export class IdentityModule extends QubicBase {
  constructor(provider: QubicProvider) {
    super(provider);
  }

  /**
   * Retrieves the list of assets owned by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch owned assets.
   * @returns {Promise<any>} A promise that resolves to the list of owned assets, or null if an error occurred.
   */
  async getOwnedAssets(identity: string): Promise<IGetOwnedAssets | null> {
    return await this.httpClient
      .call<IGetOwnedAssets>(`/${this.version}/assets/${identity}/owned`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching issued assets:", error);
        return null;
      });
  }

  /**
   * Retrieves the list of assets possessed by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch possessed assets.
   * @returns {Promise<any>} A promise that resolves to the list of possessed assets, or null if an error occurred.
   */
  async getPossessedAssets(
    identity: string
  ): Promise<IGetPossessedAssets | null> {
    return this.httpClient
      .call<IGetPossessedAssets>(
        `/${this.version}/assets/${identity}/possessed`,
        "GET"
      )
      .catch((error) => {
        this.logger.error("Error fetching possessed assets:", error);
        return null;
      });
  }

  /**
   * Retrieves the list of assets issued by a specific identity.
   *
   * @param {string} identity - The identity for which to fetch issued assets.
   * @returns {Promise<any>} A promise that resolves to the list of issued assets, or null if an error occurred.
   */
  async getIssuedAssets(identity: string): Promise<IGetIssuedAssets | null> {
    return await this.httpClient
      .call<IGetIssuedAssets>(
        `/${this.version}/assets/${identity}/issued`,
        "GET"
      )
      .catch((error) => {
        this.logger.error("Error fetching issued assets:", error);
        return null;
      });
  }

  /**
   * Fetches the balance of a specific address ID.
   *
   * @param {string} addressID The address ID for which to fetch the balance.
   * @returns {Promise<any>} A promise that resolves to the balance, or null if an error occurred.
   */
  async getBalanceByAddress(addressID: string): Promise<any> {
    return await this.httpClient
      .call(`/${this.version}/balances/${addressID}`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching balance:", error);
        return null;
      });
  }

  /**
   * Retrieves the balance of a specific identity.
   *
   * @param {string} Id The identity for which to fetch the balance.
   * @returns {Promise<IGetBalanceByIdentity | null>} A promise that resolves to the balance, or null if an error occurred.
   */
  async getBalanceByIdentity(
    Id: string
  ): Promise<IGetBalanceByIdentity | null> {
    return await this.httpClient
      .call<IGetBalanceByIdentity>(`/${this.version}/balances/${Id}`, "GET")
      .catch((error) => {
        this.logger.error("Error fetching balance:", error);
        return null;
      });
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
  async loadIdentityFromPrivateKey(
    privateKey: Uint8Array
  ): Promise<{
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
