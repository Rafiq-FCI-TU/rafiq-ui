import { formatMessageTime } from "../../lib/chatUtils";
import type { Message } from "../../types/Chat";
import { Check, CheckCheck } from "lucide-react";

export default function Message({
  message,
  isMe,
}: {
  message: Message;
  isMe: boolean;
}) {
  const timestamp = formatMessageTime(message.sentAt);

  return (
    <div key={message.id} className={`flex ${isMe ? "flex-row-reverse" : ""}`}>
      {/* Message Bubble */}
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isMe
            ? "bg-primary text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div
          className={`flex items-center gap-1 mt-1 text-xs ${
            isMe ? "text-white/70" : "text-gray-400"
          }`}
        >
          <span>{timestamp}</span>
          {isMe && (
            <span
              className={`${
                message.isRead ? "text-blue-400" : "text-white/50"
              }`}
            >
              {message.isRead ? (
                <CheckCheck className="size-4" />
              ) : (
                <Check className="size-4" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
