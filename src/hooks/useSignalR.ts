import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Message } from "../types/Chat";

const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io";

interface UseSignalROptions {
  token: string | null;
  onReceiveMessage: (message: Message) => void;
  onError?: (error: Error) => void;
}

export function useSignalR({
  token,
  onReceiveMessage,
  onError,
}: UseSignalROptions) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const onReceiveMessageRef = useRef(onReceiveMessage);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onReceiveMessageRef.current = onReceiveMessage;
  }, [onReceiveMessage]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE}/hub?access_token=${token}`, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.on("ReceiveMessage", (data) => {
      console.log(data);
    });

    connection
      .start()
      .then(() => {
        setIsConnected(true);
      })
      .catch((err) => {
        setIsConnected(false);
        onErrorRef.current?.(err);
      });

    connection.onreconnecting(() => {
      setIsConnected(false);
    });

    connection.onreconnected(() => {
      setIsConnected(true);
    });

    connection.onclose((err) => {
      setIsConnected(false);
      if (err) {
        onErrorRef.current?.(err);
      }
    });
  }, [token]);



  return {  isConnected };
}
