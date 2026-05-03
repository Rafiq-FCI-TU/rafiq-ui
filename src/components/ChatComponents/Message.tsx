import { getInitials } from "../../lib/chatUtils";
import type { Message, MessageProps } from "../../types/Chat";

export default function Message({
  message,
  index,
  messages,
  name,
}: MessageProps) {
  const showAvatar = index === 0 || messages[index - 1].isMe !== message.isMe;
  return (
    <div
      key={message.id}
      className={`flex gap-3 ${message.isMe ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {showAvatar ? (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
              message.isMe ? "bg-primary" : "bg-gray-400"
            }`}
          >
            {getInitials(message.isMe ? "Me" : name)}
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          message.isMe
            ? "bg-primary text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div
          className={`flex items-center gap-1 mt-1 text-xs ${
            message.isMe ? "text-white/70" : "text-gray-400"
          }`}
        >
          <span>{message.timestamp}</span>
          {message.isMe && message.status && (
            <span className="text-xs">
              {message.status === "read"
                ? "✓✓"
                : message.status === "delivered"
                  ? "✓✓"
                  : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
