import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Search, Sidebar, SidebarOpen, X } from "lucide-react";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Ahmed Mohamed",
    lastMessage: "Hello, how are you?",
    timestamp: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Sarah Ahmed",
    lastMessage: "I'll send you the files tomorrow",
    timestamp: "09:15 AM",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Dev Team",
    lastMessage: "Task completed successfully",
    timestamp: "Yesterday",
    unreadCount: 5,
  },
  {
    id: "4",
    name: "Khaled Ali",
    lastMessage: "Thank you very much",
    timestamp: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "5",
    name: "Nora Hassan",
    lastMessage: "Can we meet tomorrow?",
    timestamp: "Monday",
    unreadCount: 1,
  },
  {
    id: "6",
    name: "Mohamed Abdullah",
    lastMessage: "Booking confirmed",
    timestamp: "Sunday",
    unreadCount: 0,
  },
  {
    id: "7",
    name: "Laila Mahmoud",
    lastMessage: "Sent you the approval",
    timestamp: "Saturday",
    unreadCount: 0,
  },
  {
    id: "7",
    name: "Laila Mahmoud",
    lastMessage: "Sent you the approval",
    timestamp: "Saturday",
    unreadCount: 0,
  },
  {
    id: "7",
    name: "Laila Mahmoud",
    lastMessage: "Sent you the approval",
    timestamp: "Saturday",
    unreadCount: 0,
  },
  {
    id: "7",
    name: "Laila Mahmoud",
    lastMessage: "Sent you the approval",
    timestamp: "Saturday",
    unreadCount: 0,
  },
];

interface ConversationsSideBarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function ConversationsSideBar({
  isOpen: controlledIsOpen,
  onToggle,
}: ConversationsSideBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* sidebar Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed cursor-pointer top-23.5 right-4 z-40 p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-colors"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? <Sidebar size={24} /> : <SidebarOpen size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed top-[80px] left-0 right-0 bottom-0 bg-black/50 z-30 md:hidden"
          onClick={handleToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-[81px] md:top-0 left-0 h-[calc(100vh-81px)] bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-40 shrink-0 ${
          sidebarOpen
            ? "w-[320px] translate-x-0"
            : "w-0 -translate-x-full md:opacity-100 overflow-hidden"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Conversations</h2>
            <button
              onClick={handleToggle}
              className="md:hidden p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              to={`/chats/${conversation.id}`}
            />
          ))}

          {filteredConversations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Search size={48} className="mb-3 opacity-50" />
              <p className="text-sm">No matching conversations</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  to: string;
}

function ConversationItem({ conversation, to }: ConversationItemProps) {
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
