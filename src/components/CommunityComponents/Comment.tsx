import type {
  Comment as CommentType,
  UserReaction,
} from "../../types/Community";
import { getInitials, getAvatarColor, REACTIONS } from "./communityUtils";
import { ReactionButton } from "./ReactionButton";

function CommentReactionsBreakdown({
  summary,
}: {
  summary: CommentType["reactionSummary"];
}) {
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

interface CommentProps {
  comment: CommentType;
  onReact: (commentId: number, reaction: UserReaction) => void;
}

export function Comment({ comment, onReact }: CommentProps) {
  const cInitials = getInitials(
    comment.author.firstName,
    comment.author.lastName,
  );
  const cColor = getAvatarColor(comment.author.fullName);

  const hasReactions = comment.totalReactionsCount > 0;

  return (
    <div className="flex gap-3">
      <div
        className={`w-8 h-8 ${cColor} rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0 ring-2 ring-white shadow-sm`}
      >
        {cInitials}
      </div>
      <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none px-3 py-2.5 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-xs text-gray-900">
            {comment.author.fullName}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-xs text-gray-400">{comment.postedAgo}</span>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed">
          {comment.content}
        </p>

        {/* Reactions Row */}
        <div className="flex items-center justify-between mt-2 pt-1.5">
          <ReactionButton item={comment} onReact={onReact} size="sm" />
          <div className="flex items-center gap-2">
            {hasReactions ? (
              <CommentReactionsBreakdown summary={comment.reactionSummary} />
            ) : (
              <span className="text-xs text-gray-400 italic">
                No reactions yet
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
