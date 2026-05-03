export interface Conversation {
  partnerId: string;
  partnerName: string;
  lastMessage: Message;
  unreadCount: number;
}
export interface ConversationItemProps {
  conversation: Conversation;
}

export interface ConversationsSideBarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
  readAt: null | string;
}
export interface MessageProps {
  message: Message;
  index: number;
  messages: Message[];
  name: string;
}
