import type {
  Comment as CommentType,
  UserReaction,
} from "../../types/Community";
import { getInitials, getAvatarColor } from "./communityUtils";
import { ReactionButton } from "./ReactionButton";

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

  return (
    <div className="flex gap-3">
      <div
        className={`w-8 h-8 ${cColor} rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0`}
      >
        {cInitials}
      </div>
      <div className="flex-1 bg-gray-50 rounded-xl rounded-tl-none px-3 py-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-xs text-gray-900">
            {comment.author.fullName}
          </span>
          <span className="text-xs text-gray-400">{comment.postedAgo}</span>
        </div>
        <p className="text-sm text-gray-700">{comment.content}</p>
        <div className="mt-1">
          <ReactionButton item={comment} onReact={onReact} size="sm" />
        </div>
      </div>
    </div>
  );
}
