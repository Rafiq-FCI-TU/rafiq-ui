import { useState, useRef, useEffect } from "react";
import type {
  Comment as CommentType,
  UserReaction,
} from "../../types/Community";
import { getInitials, getAvatarColor } from "../../lib/communityUtils";
import { ReactionButton } from "./ReactionButton";
import { CommentReactionsBreakdown } from "./CommentReactionsBreakdown";
import { MoreHorizontal, Trash2, AlertTriangle } from "lucide-react";

interface CommentProps {
  comment: CommentType;
  onReact: (commentId: number, reaction: UserReaction) => void;
  onDelete?: (postId: number, commentId: number) => void;
  postId?: number;
  currentUser?: { id?: string } | null;
}

export function Comment({
  comment,
  onReact,
  onDelete,
  postId,
  currentUser,
}: CommentProps) {
  const cInitials = getInitials(
    comment.author.firstName,
    comment.author.lastName,
  );
  const cColor = getAvatarColor(comment.author.fullName);

  const hasReactions = comment.totalReactionsCount > 0;
  const isAuthor = currentUser?.id === comment.author.id;
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* Comment Menu */}
          {isAuthor && (
            <div ref={menuRef} className="relative ml-auto">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 cursor-pointer rounded-md hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600"
                aria-label="Comment options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[120px] z-20 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(true);
                      setShowMenu(false);
                    }}
                    className="cursor-pointer w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
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

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="mt-3 p-4 bg-red-50/80 rounded-xl border border-red-200 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-red-800 mb-2">
                  Delete this comment?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 cursor-pointer py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (onDelete && postId) onDelete(postId, comment.id);
                      setShowDeleteConfirm(false);
                    }}
                    className="px-3 cursor-pointer py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-400 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
