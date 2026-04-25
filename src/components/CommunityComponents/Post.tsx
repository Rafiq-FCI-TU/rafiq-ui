import { MessageCircle, Share2, Send } from "lucide-react";
import { useState } from "react";
import type { Post as PostType, UserReaction } from "../../types/Community";
import { getInitials, getAvatarColor } from "./communityUtils";
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
  currentUser: { username?: string } | null;
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

export function PostCard({
  post,
  onReact,
  onCommentReact,
  onAddComment,
  currentUser,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const authorInitials = getInitials(
    post.author.firstName,
    post.author.lastName,
  );
  const authorColor = getAvatarColor(post.author.fullName);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 ${authorColor} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
        >
          {authorInitials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {post.author.fullName}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{post.postedAgo}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3" />

      {/* Actions */}
      <div className="flex items-center gap-6">
        <ReactionButton item={post} onReact={onReact} />
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-2 transition-colors group ${
            showComments ? "text-primary" : "text-gray-500 hover:text-primary"
          }`}
        >
          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{post.commentsCount}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors group ml-auto">
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {/* Comment List */}
          {post.comments && post.comments.length > 0 && (
            <div className="space-y-3 mb-4">
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
          )}

          {/* Add Comment */}
          <CommentInput
            currentUser={currentUser}
            onSubmit={(content) => onAddComment(post.id, content)}
          />
        </div>
      )}
    </div>
  );
}
