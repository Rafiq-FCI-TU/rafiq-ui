import { NavLink } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ConversationItemProps, Conversation } from "../../types/Chat";
import { formatMessageTime, getInitials } from "../../lib/chatUtils";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api";

export function ConversationItem({ conversation }: ConversationItemProps) {
  const { token, user } = useAuth();
  const queryClient = useQueryClient();

  const markAsReadMutation = useMutation({
    mutationFn: async (otherUserId: string) => {
      const res = await fetch(`${API_BASE}/Chat/read/${otherUserId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to mark messages as read");
      return res.json().catch(() => ({}));
    },
    onMutate: async (otherUserId: string) => {
      await queryClient.cancelQueries({ queryKey: ["Conversations"] });
      const previousConversations = queryClient.getQueryData(["Conversations"]);

      queryClient.setQueryData(
        ["Conversations"],
        (old: { data?: Conversation[] } | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((c: Conversation) =>
              c.partnerId === otherUserId ? { ...c, unreadCount: 0 } : c,
            ),
          };
        },
      );

      return { previousConversations };
    },
    onError: (_err, _otherUserId, context) => {
      if (context?.previousConversations) {
        queryClient.setQueryData(
          ["Conversations"],
          context.previousConversations,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Conversations"] });
    },
  });

  const handleClick = () => {
    if (conversation.unreadCount > 0) {
      markAsReadMutation.mutate(conversation.partnerId);
    }
  };

  return (
    <NavLink
      to={conversation.partnerId}
      onClick={handleClick}
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
              {getInitials(conversation.partnerName)}
            </div>
            {conversation.unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
            )}
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
                {conversation.partnerName}
              </h3>
              <span className="text-xs text-gray-400 shrink-0">
                {formatMessageTime(conversation.lastMessage.sentAt)}
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
                {user?.id === conversation.lastMessage.senderId
                  ? "Me"
                  : conversation.partnerName.split(" ")[0]}
                : {conversation.lastMessage.content}
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
