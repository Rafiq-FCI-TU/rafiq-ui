import { Send } from "lucide-react";
import { useState } from "react";
import type { CommentInputProps } from "../../types/Community";

export function CommentInput({ currentUser, onSubmit }: CommentInputProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onSubmit(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="size-8 bg-linear-to-r from-primary-dark to-primary rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0">
        {currentUser?.username?.charAt(0)?.toUpperCase() || "U"}
      </div>

      <input
        type="text"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
      />

      <button
        onClick={handleSubmit}
        disabled={!newComment.trim()}
        className="size-8 bg-primary cursor-pointer text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
