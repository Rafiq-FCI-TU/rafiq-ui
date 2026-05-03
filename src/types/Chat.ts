export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}
export interface ConversationItemProps {
  conversation: Conversation;
  to: string;
}

export interface ConversationsSideBarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}
export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: "sent" | "delivered" | "read";
}
export interface MessageProps {
  message: Message;
  index: number;
  messages: Message[];
  name: string;
}
