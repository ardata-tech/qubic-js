import axios, { AxiosInstance } from "axios";
import { config } from "../../config";

export class HttpClient {
  private static instance: HttpClient;
  private readonly axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.rpcBaseUrl.dev,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  /**
   * Get the underlying Axios instance.
   *
   * @returns {AxiosInstance} The underlying Axios instance.
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * Set the Bearer token for requests.
   *
   * @param {string} token The Bearer token.
   * @returns {this}
   */
  public setBearerToken(token: string) {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    return this;
  }

  /**
   * Set the API key for requests.
   *
   * @param {string} apiKey The API key.
   * @returns {this}
   */
  public setApiKey(apiKey: string) {
    this.axiosInstance.defaults.headers.common["API-KEY"] = apiKey;
    return this;
  }

  /**
   * Set the base URL for requests.
   *
   * @param {string} url The base URL.
   * @returns {this}
   * @memberof HttpClient
   */
  setBaseUrl(url: string) {
    this.axiosInstance.defaults.baseURL = url;
    return this;
  }

  /**
   * Set the timeout for requests.
   *
   * @param {number} timeout The timeout in milliseconds.
   * @returns {this}
   * @memberof HttpClient
   */
  setTimeout(timeout: number) {
    this.axiosInstance.defaults.timeout = timeout;
    return this;
  }
}

/**
 * Example usage:
 *  const httpClient = HttpClient.getInstance();
 *   httpClient
 *     .setBearerToken("YOUR_BEARER_TOKEN")
 *     .setApiKey("YOUR_API_KEY")
 *     .setBaseUrl("https://api.example.com")
 *     .setTimeout(5000);
 *   const response = await httpClient.get("/path/to/resource");
*/