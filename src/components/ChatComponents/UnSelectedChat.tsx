import { MessageCircle } from "lucide-react";

export default function UnSelectedChat() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50/50">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle size={40} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Select a conversation
        </h2>
        <p className="text-gray-500 max-w-sm">
          Choose a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}
