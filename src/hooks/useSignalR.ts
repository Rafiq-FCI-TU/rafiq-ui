import { useEffect, useRef, useCallback, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Message } from "../types/Chat";

const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io";

interface UseSignalROptions {
  token: string | null;
  onReceiveMessage: (message: Message) => void;
  onError?: (error: Error) => void;
}

export function useSignalR({ token, onReceiveMessage }: UseSignalROptions) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE}/hub`, {
        
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.on("ReceiveMessage", (message: Message) => {
      onReceiveMessage(message);
    });

    connection
      .start()
      .then(() => {
        setIsConnected(true);
      })
      .catch(() => {
        setIsConnected(false);
      });

    connection.onreconnecting(() => {
      setIsConnected(false);
    });

    connection.onreconnected(() => {
      setIsConnected(true);
    });

    return () => {
      connection.stop();
    };
  }, [token, onReceiveMessage]);

  const sendMessage = useCallback(
    async (body: {
      receiverId: string;
      content: string;
    }): Promise<Message | null> => {
      const connection = connectionRef.current;
      if (
        !connection ||
        connection.state !== signalR.HubConnectionState.Connected
      ) {
        return null;
      }

      try {
        const result = await connection.invoke<Message>("SendMessage", body);
        return result;
      } catch {
        return null;
      }
    },
    [],
  );

  return { sendMessage, isConnected };
}
