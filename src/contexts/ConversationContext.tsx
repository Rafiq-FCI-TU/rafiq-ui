import { createContext, useState, type ReactNode } from "react";
import type { Conversation } from "../types/Chat";

const ConversationContext = createContext<{
  conversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
} | undefined>(undefined);
export function ConversationProvider({ children }: { children: ReactNode }) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  return (
    <ConversationContext.Provider value={{ conversation, setConversation }}>
      {children}
    </ConversationContext.Provider>
  );
}

export { ConversationContext };
