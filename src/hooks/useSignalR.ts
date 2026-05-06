import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Message } from "../types/Chat";

const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io";

interface UseSignalROptions {
  token: string | null;
  onReceiveMessage: (message: Message) => void;
}

export function useSignalR({ token, onReceiveMessage }: UseSignalROptions) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const onReceiveMessageRef = useRef(onReceiveMessage);

  useEffect(() => {
    onReceiveMessageRef.current = onReceiveMessage;
  }, [onReceiveMessage]);

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

    connection.on("newmessage", (data: Message) => {
      onReceiveMessageRef.current?.(data);
    });

    connection
      .start()
      .then(() => {
        setIsConnected(true);
      })
      .catch((err) => {
        console.error("[SignalR] Connection error:", err);
        setIsConnected(false);
      });

    connection.onreconnecting(() => {
      setIsConnected(false);
    });

    connection.onreconnected(() => {
      setIsConnected(true);
    });

    connection.onclose(() => {
      setIsConnected(false);
    });

    return () => {
      connection.stop();
    };
  }, [token]);

  return { isConnected };
}
