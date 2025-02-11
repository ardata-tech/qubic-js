export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async post<T>(endpoint: string, body: object): Promise<T> {
    try {
      const response = await fetch(this.baseUrl + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`[HttpClient] HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error("[HttpClient] Request failed:", error);
      throw error;
    }
  }
}
