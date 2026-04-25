import { MessageCircle, Share2, AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Post as PostType, UserReaction } from "../../types/Community";
import type { User } from "../../contexts/AuthContext";
import { getInitials, getAvatarColor } from "../../lib/communityUtils";
import { ReactionButton } from "./ReactionButton";
import { Comment } from "./Comment";
import { ReactionsBreakdown } from "./ReactionsBreakdown";
import { PostMenu } from "./PostMenu";
import { EditPostForm } from "./EditPostForm";
import { CommentInput } from "./CommentInput";

interface PostCardProps {
  post: PostType;
  onReact: (postId: number, reaction: UserReaction) => void;
  onCommentReact: (
    postId: number,
    commentId: number,
    reaction: UserReaction,
  ) => void;
  onAddComment: (postId: number, content: string) => void;
  onDeleteComment: (postId: number, commentId: number) => void;
  onEditPost: (postId: number, newContent: string, newTags: string[]) => void;
  onDeletePost: (postId: number) => void;
  currentUser: User | null;
}

export function PostCard({
  post,
  onReact,
  onCommentReact,
  onAddComment,
  onDeleteComment,
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
        <div className="mb-5 p-5 bg-red-50/80 rounded-2xl border border-red-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 ring-4 ring-red-50">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-red-900 mb-1">
                Delete this post?
              </h4>
              <p className="text-sm text-red-700/80 mb-4 leading-relaxed">
                This action cannot be undone. The post and all its comments will
                be permanently removed from your account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all border border-gray-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="cursor-pointer px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-400 transition-all shadow-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
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
          title="Comment"
        >
          <MessageCircle className="w-[18px] h-[18px]" />
        </button>
        <button
          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-xl transition-all ml-auto"
          title="Share"
        >
          <Share2 className="w-[18px] h-[18px]" />
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
                  onDelete={onDeleteComment}
                  postId={post.id}
                  currentUser={currentUser}
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
