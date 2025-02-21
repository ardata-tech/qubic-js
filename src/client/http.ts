export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async call<T>(endpoint: string, method: string, body?: object): Promise<T> {
    const response = await fetch(this.baseUrl + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      const message = await response.text();
      if (message) {
          console.log("error message", message);
      }
    
      throw new Error(
        `[HttpClient] HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data as T;
  }
}
