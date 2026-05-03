import { REACTIONS } from "../../lib/communityUtils";
import type { ReactionsBreakdownProps } from "../../types/Community";



export function ReactionsBreakdown({ summary }: ReactionsBreakdownProps) {
  const activeReactions = REACTIONS.filter(
    (r) => r.type && summary.types[r.type] > 0,
  );

  if (activeReactions.length === 0) {
    return <span className="text-sm text-gray-400">Be the first to react</span>;
  }

  return (
    <div className="flex items-center">
      {activeReactions.map((r, index) => (
        <div
          key={r.type}
          className={`flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow-sm border border-gray-100 ${
            index > 0 ? "-ml-2" : ""
          }`}
          style={{ zIndex: activeReactions.length - index }}
          title={`${r.label}: ${r.type ? summary.types[r.type] : 0}`}
        >
          <span className="text-base">{r.emoji}</span>
          <span className="text-xs font-semibold text-gray-600 min-w-[1ch]">
            {r.type ? summary.types[r.type] : 0}
          </span>
        </div>
      ))}
    </div>
  );
}
