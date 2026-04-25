import { REACTIONS } from "../../lib/communityUtils";
import type { Comment } from "../../types/Community";

interface CommentReactionsBreakdownProps {
  summary: Comment["reactionSummary"];
}

export function CommentReactionsBreakdown({
  summary,
}: CommentReactionsBreakdownProps) {
  const activeReactions = REACTIONS.filter(
    (r) => r.type && summary.types[r.type] > 0,
  );

  if (activeReactions.length === 0) return null;

  return (
    <div className="flex items-center">
      {activeReactions.map((r, index) => (
        <div
          key={r.type}
          className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white shadow-sm border border-gray-100 text-xs ${
            index > 0 ? "-ml-1.5" : ""
          }`}
          style={{ zIndex: activeReactions.length - index }}
          title={`${r.label}: ${r.type ? summary.types[r.type] : 0}`}
        >
          <span>{r.emoji}</span>
          <span className="font-semibold text-gray-600">
            {r.type ? summary.types[r.type] : 0}
          </span>
        </div>
      ))}
    </div>
  );
}
