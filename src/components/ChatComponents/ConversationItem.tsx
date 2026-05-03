import { NavLink } from "react-router";
import type { ConversationItemProps } from "../../types/Chat";
import { getInitials } from "../../lib/chatUtils";

export function ConversationItem({ conversation, to }: ConversationItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group border ${
          isActive
            ? "bg-primary/10 border-primary/20"
            : "hover:bg-gray-50 border-transparent"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-white transition-colors ${
                isActive ? "bg-primary" : "bg-gray-400 group-hover:bg-primary"
              }`}
            >
              {getInitials(conversation.name)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 text-right">
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`text-sm font-semibold truncate transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-gray-800 group-hover:text-primary"
                }`}
              >
                {conversation.name}
              </h3>
              <span className="text-xs text-gray-400 shrink-0">
                {conversation.timestamp}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <p
                className={`text-sm truncate ${
                  conversation.unreadCount > 0
                    ? "text-gray-800 font-medium"
                    : "text-gray-500"
                }`}
              >
                {conversation.lastMessage}
              </p>
              {conversation.unreadCount > 0 && (
                <span className="shrink-0 min-w-[20px] h-5 px-1.5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {conversation.unreadCount > 9
                    ? "9+"
                    : conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </NavLink>
  );
}
