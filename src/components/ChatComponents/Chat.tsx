import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useParams } from "react-router";
import type { Message } from "../../types/Chat";
import MessageComponent from "./Message";
import { getInitials } from "../../lib/chatUtils";

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hello! How are you doing today?",
    timestamp: "10:25 AM",
    isMe: false,
    status: "read",
  },
  {
    id: "2",
    text: "I'm doing great, thanks for asking! Working on the new project.",
    timestamp: "10:27 AM",
    isMe: true,
    status: "read",
  },
  {
    id: "3",
    text: "That's awesome! Let me know if you need any help.",
    timestamp: "10:28 AM",
    isMe: false,
    status: "read",
  },
  {
    id: "4",
    text: "Actually, could you review the design mockups I sent yesterday?",
    timestamp: "10:30 AM",
    isMe: true,
    status: "delivered",
  },
  {
    id: "5",
    text: "Sure thing! I'll check them out right now.",
    timestamp: "10:31 AM",
    isMe: false,
    status: "read",
  },
];

const mockConversations = [
  { id: "1", name: "Ahmed Mohamed", status: "online" },
  { id: "2", name: "Sarah Ahmed", status: "offline" },
  { id: "3", name: "Dev Team", status: "online" },
  { id: "4", name: "Khaled Ali", status: "away" },
  { id: "5", name: "Nora Hassan", status: "online" },
  { id: "6", name: "Mohamed Abdullah", status: "offline" },
  { id: "7", name: "Laila Mahmoud", status: "away" },
];

export default function Chat() {
  const { userId } = useParams();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newMessage]);

  const conversation = mockConversations.find((c) => c.id === userId) || {
    id: userId,
    name: `User ${userId}`,
    status: "offline",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
            {getInitials(conversation.name)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{conversation.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 min-h-0">
        {messages.map((message, index) => (
          <MessageComponent
            key={message.id}
            message={message}
            index={index}
            messages={messages}
            name={conversation.name}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 flex items-end gap-2 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex-1 bg-gray-100 rounded-2xl flex items-end px-4 py-2">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 resize-none overflow-y-auto"
            style={{ minHeight: "20px", maxHeight: "128px" }}
            rows={1}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="p-3 bg-primary text-white rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
