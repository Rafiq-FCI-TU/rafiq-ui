import { useParams } from "react-router";
import { useState } from "react";
import UnSelectedChat from "../components/ChatComponents/UnSelectedChat";
import ConversationsSideBar from "../components/ChatComponents/ConversationsSideBar";
import Chat from "../components/ChatComponents/Chat";

export default function Chats() {
  const { userId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <main className="flex h-[calc(100vh-81px)] overflow-hidden">
      {/* Sidebar */}
      <ConversationsSideBar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden">
        {userId ? <Chat /> : <UnSelectedChat />}
      </div>
    </main>
  );
}
