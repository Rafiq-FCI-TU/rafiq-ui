import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { Post, Comment, UserReaction } from "../types/Community";
import {
  MessageCircle,
  Share2,
  Search,
  Filter,
  Image,
  Send,
  ThumbsUp,
} from "lucide-react";

const REACTIONS: {
  type: UserReaction;
  emoji: string;
  label: string;
  color: string;
}[] = [
  { type: "like", emoji: "👍", label: "Like", color: "text-blue-500" },
  { type: "love", emoji: "❤️", label: "Love", color: "text-red-500" },
  { type: "haha", emoji: "😂", label: "Haha", color: "text-yellow-500" },
  { type: "wow", emoji: "😮", label: "Wow", color: "text-orange-500" },
  { type: "sad", emoji: "😢", label: "Sad", color: "text-yellow-600" },
  { type: "angry", emoji: "😡", label: "Angry", color: "text-red-600" },
];

const AVATAR_COLORS = [
  "bg-rose-400",
  "bg-amber-400",
  "bg-teal-400",
  "bg-blue-400",
  "bg-violet-400",
  "bg-pink-400",
];

function getInitials(firstName: string, lastName: string): string {
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
}

function getAvatarColor(fullName: string): string {
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function emptyReactionSummary() {
  return {
    total: 0,
    types: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
    userReaction: null as null,
  };
}

const HASHTAGS = ["#milestone", "#question", "#advice"];

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    content:
      'Just wanted to share that my daughter spoke her first full sentence today! "I want cookie" - I cried happy tears. The speech therapy exercises really work! 🎉',
    createdAt: "2026-04-20T10:00:00Z",
    postedAgo: "2 hours ago",
    tags: ["#milestone", "#speech"],
    totalReactionsCount: 24,
    commentsCount: 1,
    author: {
      id: "a1",
      firstName: "Sarah",
      lastName: "M.",
      fullName: "Sarah M.",
    },
    reactionSummary: {
      total: 24,
      types: { like: 24, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      userReaction: null,
    },
    comments: [
      {
        id: 101,
        content: "That's wonderful news! Keep up the great work! 🎊",
        createdAt: "2026-04-20T11:00:00Z",
        postedAgo: "1 hour ago",
        totalReactionsCount: 3,
        author: {
          id: "a2",
          firstName: "Dr. Johnson",
          lastName: "",
          fullName: "Dr. Johnson",
        },
        reactionSummary: {
          total: 3,
          types: { like: 3, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
          userReaction: null,
        },
      },
    ],
  },
  {
    id: 2,
    content:
      "Reminder: Early intervention is key! If you notice any developmental delays, reach out to our team. We're here to help every step of the way.",
    createdAt: "2026-04-20T07:00:00Z",
    postedAgo: "5 hours ago",
    tags: ["#advice", "#professional"],
    totalReactionsCount: 18,
    commentsCount: 0,
    author: {
      id: "a2",
      firstName: "Dr. Johnson",
      lastName: "",
      fullName: "Dr. Johnson",
    },
    reactionSummary: {
      total: 18,
      types: { like: 18, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      userReaction: null,
    },
    comments: [],
  },
  {
    id: 3,
    content:
      "Has anyone tried the new sensory integration activities? Looking for recommendations for my 4-year-old who is sensitive to loud sounds.",
    createdAt: "2026-04-20T04:00:00Z",
    postedAgo: "8 hours ago",
    tags: ["#question", "#sensory"],
    totalReactionsCount: 12,
    commentsCount: 0,
    author: {
      id: "a3",
      firstName: "Michael",
      lastName: "R.",
      fullName: "Michael R.",
    },
    reactionSummary: {
      total: 12,
      types: { like: 12, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      userReaction: null,
    },
    comments: [],
  },
];

interface PostCardProps {
  post: Post;
  onReact: (postId: number, reaction: UserReaction) => void;
  onCommentReact: (
    postId: number,
    commentId: number,
    reaction: UserReaction,
  ) => void;
  onAddComment: (postId: number, content: string) => void;
  currentUser: { username?: string } | null;
}

interface Reactionable {
  reactionSummary: {
    userReaction: UserReaction;
    total: number;
    types: {
      like: number;
      love: number;
      haha: number;
      wow: number;
      sad: number;
      angry: number;
    };
  };
}

function ReactionButton<T extends { id: number } & Reactionable>({
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

function PostCard({
  post,
  onReact,
  onCommentReact,
  onAddComment,
  currentUser,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(post.id, newComment.trim());
      setNewComment("");
    }
  };
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
              {post.comments.map((comment) => {
                const cInitials = getInitials(
                  comment.author.firstName,
                  comment.author.lastName,
                );
                const cColor = getAvatarColor(comment.author.fullName);
                return (
                  <div key={comment.id} className="flex gap-3">
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
                        <span className="text-xs text-gray-400">
                          {comment.postedAgo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                      <div className="mt-1">
                        <ReactionButton
                          item={comment}
                          onReact={(commentId, reaction) =>
                            onCommentReact(post.id, commentId, reaction)
                          }
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Comment */}
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
                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
              />
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const handleReact = (postId: number, reaction: UserReaction) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const prevReaction = post.reactionSummary.userReaction;
        const isRemoving = prevReaction === reaction;
        const newReaction = isRemoving ? null : reaction;

        const newTypes = { ...post.reactionSummary.types };
        if (prevReaction) newTypes[prevReaction]--;
        if (newReaction) newTypes[newReaction]++;

        const newTotal = isRemoving
          ? post.totalReactionsCount - 1
          : prevReaction
            ? post.totalReactionsCount
            : post.totalReactionsCount + 1;

        return {
          ...post,
          totalReactionsCount: newTotal,
          reactionSummary: {
            ...post.reactionSummary,
            total: newTotal,
            types: newTypes,
            userReaction: newReaction,
          },
        };
      }),
    );
  };

  const handleCommentReact = (
    postId: number,
    commentId: number,
    reaction: UserReaction,
  ) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const prevReaction = comment.reactionSummary.userReaction;
            const isRemoving = prevReaction === reaction;
            const newReaction = isRemoving ? null : reaction;

            const newTypes = { ...comment.reactionSummary.types };
            if (prevReaction) newTypes[prevReaction]--;
            if (newReaction) newTypes[newReaction]++;

            const newTotal = isRemoving
              ? comment.totalReactionsCount - 1
              : prevReaction
                ? comment.totalReactionsCount
                : comment.totalReactionsCount + 1;

            return {
              ...comment,
              totalReactionsCount: newTotal,
              reactionSummary: {
                ...comment.reactionSummary,
                total: newTotal,
                types: newTypes,
                userReaction: newReaction,
              },
            };
          }),
        };
      }),
    );
  };

  const handleAddComment = (postId: number, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
      postedAgo: "Just now",
      totalReactionsCount: 0,
      author: {
        id: user?.id || "me",
        firstName: user?.username || "You",
        lastName: "",
        fullName: user?.username || "You",
      },
      reactionSummary: emptyReactionSummary(),
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsCount: post.commentsCount + 1,
              comments: [...post.comments, newComment],
            }
          : post,
      ),
    );
  };

  const toggleHashtag = (tag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const displayName = user?.username || "You";
    const post: Post = {
      id: Date.now(),
      content: newPost.trim(),
      createdAt: new Date().toISOString(),
      postedAgo: "Just now",
      tags: selectedHashtags.length > 0 ? selectedHashtags : [],
      totalReactionsCount: 0,
      commentsCount: 0,
      author: {
        id: user?.id || "me",
        firstName: displayName,
        lastName: "",
        fullName: displayName,
      },
      reactionSummary: emptyReactionSummary(),
      comments: [],
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    setSelectedHashtags([]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Create Post Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-linear-to-r from-primary-dark to-primary rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {user?.username?.charAt(0)?.toUpperCase() || "YO"}
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Share your thoughts, ask questions, or celebrate milestones..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleCreatePost();
                }
              }}
              className="w-full resize-none border-0 focus:ring-0 text-sm text-gray-700 placeholder-gray-400 min-h-[60px] p-0"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {HASHTAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleHashtag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedHashtags.includes(tag)
                    ? "bg-primary text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
            <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-green-50 rounded-lg transition-colors">
              <Image className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleCreatePost}
            disabled={!newPost.trim()}
            className="px-5 py-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Post
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onReact={handleReact}
            onCommentReact={handleCommentReact}
            onAddComment={handleAddComment}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
}
