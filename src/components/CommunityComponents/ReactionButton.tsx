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
    timeoutRef.current = setTimeout(() => setShowPicker(true), 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowPicker(false), 250);
  };

  const handleReact = (reaction: UserReaction) => {
    onReact(item.id, reaction);
    setShowPicker(false);
  };

  const currentReactionData = REACTIONS.find((r) => r.type === currentReaction);
  const hasReacted = currentReaction !== null;

  const sizeClasses =
    size === "sm"
      ? {
          button: "px-2 py-1",
          icon: "w-3.5 h-3.5",
          text: "text-xs",
          emoji: "text-sm",
        }
      : {
          button: "px-3 py-2",
          icon: "w-[18px] h-[18px]",
          text: "text-sm",
          emoji: "text-base",
        };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Picker Popup */}
      {showPicker && (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-xl border border-gray-100 px-2 py-2 flex items-center gap-0.5 animate-in fade-in slide-in-from-bottom-3 duration-200 z-20">
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => handleReact(reaction.type)}
              className="hover:scale-135 cursor-pointer hover:-translate-y-1 active:scale-95 transition-all p-1.5 rounded-full hover:bg-gray-50"
              title={reaction.label}
            >
              <span className="text-xl filter drop-shadow-sm">
                {reaction.emoji}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => handleReact(currentReaction || "like")}
        className={`group flex items-center gap-1.5 rounded-xl cursor-pointer transition-all active:scale-95 ${sizeClasses.button} ${
          hasReacted
            ? `${currentReactionData?.color || "text-blue-500"} bg-current/10 hover:bg-current/15`
            : "text-gray-500 hover:text-blue-500 hover:bg-blue-50"
        }`}
      >
        {currentReactionData ? (
          <span
            className={`${sizeClasses.emoji} transition-transform group-hover:scale-110`}
          >
            {currentReactionData.emoji}
          </span>
        ) : (
          <ThumbsUp
            className={`${sizeClasses.icon} transition-transform group-hover:scale-110`}
          />
        )}
        <span className={`${sizeClasses.text} font-semibold`}>
          {item.reactionSummary.total > 0 && (
            <span className="ml-1.5 text-gray-500 font-medium">
              {item.reactionSummary.total}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
