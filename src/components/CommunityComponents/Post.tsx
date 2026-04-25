import {
  MessageCircle,
  Share2,
  Send,
  MoreHorizontal,
  X,
  Check,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Post as PostType, UserReaction } from "../../types/Community";
import type { User } from "../../contexts/AuthContext";
import { getInitials, getAvatarColor, REACTIONS } from "./communityUtils";
import { ReactionButton } from "./ReactionButton";
import { Comment } from "./Comment";

interface PostCardProps {
  post: PostType;
  onReact: (postId: number, reaction: UserReaction) => void;
  onCommentReact: (
    postId: number,
    commentId: number,
    reaction: UserReaction,
  ) => void;
  onAddComment: (postId: number, content: string) => void;
  onEditPost: (postId: number, newContent: string, newTags: string[]) => void;
  onDeletePost: (postId: number) => void;
  currentUser: User | null;
}

function CommentInput({
  currentUser,
  onSubmit,
}: {
  currentUser: { username?: string } | null;
  onSubmit: (content: string) => void;
}) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onSubmit(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 bg-linear-to-r from-primary-dark to-primary rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0">
        {currentUser?.username?.charAt(0)?.toUpperCase() || "YO"}
      </div>
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={!newComment.trim()}
          className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ReactionsBreakdown({
  summary,
}: {
  summary: PostType["reactionSummary"];
}) {
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

function PostMenu({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!onEdit && !onDelete) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[120px] z-20 animate-in fade-in duration-150">
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function EditPostForm({
  post,
  onSave,
  onCancel,
}: {
  post: PostType;
  onSave: (content: string, tags: string[]) => void;
  onCancel: () => void;
}) {
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags.join(", "));

  const handleSave = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    const newTags = tags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);
    onSave(trimmed, newTags);
  };

  return (
    <div className="mb-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-3 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all resize-none shadow-sm"
        rows={4}
        placeholder="Edit your post..."
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full px-4 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all shadow-sm"
      />
      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-white rounded-lg transition-all flex items-center gap-1.5"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
        >
          <Check className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export function PostCard({
  post,
  onReact,
  onCommentReact,
  onAddComment,
  onEditPost,
  onDeletePost,
  currentUser,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const authorInitials = getInitials(
    post.author.firstName,
    post.author.lastName,
  );
  const authorColor = getAvatarColor(post.author.fullName);

  const isAuthor = currentUser?.id === post.author.id;

  const MAX_CONTENT_LENGTH = 280;
  const shouldTruncate = post.content.length > MAX_CONTENT_LENGTH;
  const displayContent =
    shouldTruncate && !isExpanded
      ? post.content.slice(0, MAX_CONTENT_LENGTH) + "..."
      : post.content;

  const handleEdit = (newContent: string, newTags: string[]) => {
    onEditPost(post.id, newContent, newTags);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeletePost(post.id);
    setShowDeleteConfirm(false);
  };

  return (
    <article className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 ${authorColor} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm ring-2 ring-white`}
        >
          {authorInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 truncate text-[15px]">
              {post.author.fullName}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            {post.postedAgo}
          </p>
        </div>
        {isAuthor && (
          <PostMenu
            onEdit={() => setIsEditing(true)}
            onDelete={() => setShowDeleteConfirm(true)}
          />
        )}
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mb-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 mb-1">
                Delete this post?
              </p>
              <p className="text-xs text-red-600/80 mb-3">
                This action cannot be undone. The post and all its comments will
                be permanently removed.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-white rounded-lg transition-all border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mode or Content */}
      {isEditing ? (
        <EditPostForm
          post={post}
          onSave={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          {/* Content */}
          <div className="mb-4">
            <p className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap">
              {displayContent}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-sm font-semibold text-primary hover:text-primary-dark hover:underline transition-all"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-primary/5 text-primary/80 rounded-full text-xs font-medium hover:bg-primary/10 cursor-pointer transition-colors border border-primary/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </>
      )}

      {/* Reactions Summary */}
      <div className="flex items-center justify-between mb-4">
        <ReactionsBreakdown summary={post.reactionSummary} />

        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm cursor-pointer text-gray-500 hover:text-primary transition-colors font-medium hover:underline"
        >
          {post.commentsCount} comment{post.commentsCount !== 1 ? "s" : ""}
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <ReactionButton item={post} onReact={onReact} />
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex cursor-pointer items-center gap-2 px-3 py-2 rounded-xl transition-all ${
            showComments
              ? "text-primary bg-primary/10"
              : "text-gray-500 hover:text-primary hover:bg-gray-50"
          }`}
        >
          <MessageCircle className="w-[18px] h-[18px]" />
          <span className="text-sm font-semibold">
            {post.commentsCount || "Comment"}
          </span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-xl transition-all ml-auto">
          <Share2 className="w-[18px] h-[18px]" />
          <span className="text-sm font-semibold">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-5 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          {/* Comment List */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-4 mb-5">
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReact={(commentId, reaction) =>
                    onCommentReact(post.id, commentId, reaction)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 mb-5 bg-gray-50/50 rounded-xl">
              <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}

          {/* Add Comment */}
          <CommentInput
            currentUser={currentUser}
            onSubmit={(content) => onAddComment(post.id, content)}
          />
        </div>
      )}
    </article>
  );
}
