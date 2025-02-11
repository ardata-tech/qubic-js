export class WsClient {
  private ws: WebSocket;

  constructor(providerUrl: string) {
    this.ws = new WebSocket(providerUrl.replace("http", "ws"));

    this.ws.onopen = () => console.log("[WsClient] WebSocket connected");
    this.ws.onmessage = (msg) => console.log("[WsClient] Message received:", msg.data);
  }

  subscribe(event: string, callback: (data: any) => void) {
    this.ws.onmessage = (msg) => {
      const parsedData = JSON.parse(msg.data);
      if (parsedData.event === event) callback(parsedData);
    };
  }
}
