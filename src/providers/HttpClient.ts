export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async call<T>(endpoint: string, method: string, body?: object): Promise<T> {
    try {
      const response = await fetch(this.baseUrl + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) {
        throw new Error(
          `[HttpClient] HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error("[HttpClient] Request failed:", error);
      throw error;
    }
  }
}
