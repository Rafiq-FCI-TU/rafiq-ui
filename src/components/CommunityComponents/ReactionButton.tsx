import { ThumbsUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { UserReaction } from "../../types/Community";
import { REACTIONS, type Reactionable } from "./communityUtils";

export function ReactionButton<T extends { id: number } & Reactionable>({
  item,
  onReact,
  size = "md",
}: {
  item: T;
  onReact: (itemId: number, reaction: UserReaction) => void;
  size?: "sm" | "md";
}) {
  const [showPicker, setShowPicker] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentReaction = item.reactionSummary.userReaction;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowPicker(true), 200);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowPicker(false), 300);
  };

  const handleReact = (reaction: UserReaction) => {
    onReact(item.id, reaction);
    setShowPicker(false);
  };

  const currentReactionData = REACTIONS.find((r) => r.type === currentReaction);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Picker Popup */}
      {showPicker && (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border border-gray-100 px-2 py-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2 duration-200 z-10">
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => handleReact(reaction.type)}
              className="hover:scale-125 transition-transform p-1 text-lg"
              title={reaction.label}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => handleReact(currentReaction === "like" ? null : "like")}
        className={`flex items-center gap-2 transition-colors group ${
          currentReactionData
            ? currentReactionData.color
            : "text-gray-500 hover:text-blue-500"
        }`}
      >
        {currentReactionData ? (
          <span className={size === "sm" ? "text-sm" : "text-base"}>
            {currentReactionData.emoji}
          </span>
        ) : (
          <ThumbsUp
            className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} group-hover:scale-110 transition-transform`}
          />
        )}
        <span className="text-sm font-medium">
          {currentReactionData ? currentReactionData.label : "Like"}
          {item.reactionSummary.total > 0 && (
            <span className="ml-1">{item.reactionSummary.total}</span>
          )}
        </span>
      </button>
    </div>
  );
}
