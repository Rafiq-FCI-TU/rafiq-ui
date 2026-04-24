import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Filter,
  Image,
  Send,
} from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    initials: string;
    avatarColor: string;
  };
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  author: {
    name: string;
    initials: string;
    role: "Parent" | "Specialist";
    avatarColor: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  hashtags: string[];
  likedByMe?: boolean;
  commentsList?: Comment[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah M.",
      initials: "SM",
      role: "Parent",
      avatarColor: "bg-rose-400",
    },
    content:
      'Just wanted to share that my daughter spoke her first full sentence today! "I want cookie" - I cried happy tears. The speech therapy exercises really work! 🎉',
    timestamp: "2 hours ago",
    likes: 24,
    comments: 1,
    likedByMe: false,
    hashtags: ["#milestone", "#speech"],
    commentsList: [
      {
        id: "c1",
        author: {
          name: "Dr. Johnson",
          initials: "DJ",
          avatarColor: "bg-amber-400",
        },
        content: "That's wonderful news! Keep up the great work! 🎊",
        timestamp: "1 hour ago",
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Dr. Johnson",
      initials: "DJ",
      role: "Specialist",
      avatarColor: "bg-amber-400",
    },
    content:
      "Reminder: Early intervention is key! If you notice any developmental delays, reach out to our team. We're here to help every step of the way.",
    timestamp: "5 hours ago",
    likes: 18,
    comments: 0,
    likedByMe: false,
    hashtags: ["#advice", "#professional"],
    commentsList: [],
  },
  {
    id: "3",
    author: {
      name: "Michael R.",
      initials: "MR",
      role: "Parent",
      avatarColor: "bg-teal-400",
    },
    content:
      "Has anyone tried the new sensory integration activities? Looking for recommendations for my 4-year-old who is sensitive to loud sounds.",
    timestamp: "8 hours ago",
    likes: 12,
    comments: 0,
    likedByMe: false,
    hashtags: ["#question", "#sensory"],
    commentsList: [],
  },
];

const HASHTAGS = ["#milestone", "#question", "#advice"];

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  currentUser: { username?: string } | null;
}

function PostCard({ post, onLike, onAddComment, currentUser }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(post.id, newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 ${post.author.avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
        >
          {post.author.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {post.author.name}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                post.author.role === "Parent"
                  ? "bg-green-100 text-primary"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {post.author.role}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{post.timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.hashtags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-100 cursor-pointer transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3" />

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 transition-colors group ${
            post.likedByMe ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              post.likedByMe
                ? "fill-red-500 scale-110"
                : "group-hover:scale-110"
            }`}
          />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-2 transition-colors group ${
            showComments ? "text-primary" : "text-gray-500 hover:text-primary"
          }`}
        >
          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{post.comments}</span>
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
          {post.commentsList && post.commentsList.length > 0 && (
            <div className="space-y-3 mb-4">
              {post.commentsList.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div
                    className={`w-8 h-8 ${comment.author.avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0`}
                  >
                    {comment.author.initials}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl rounded-tl-none px-3 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-xs text-gray-900">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
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

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
              likedByMe: !post.likedByMe,
            }
          : post,
      ),
    );
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: {
        name: user?.username || "You",
        initials: (user?.username?.charAt(0) || "Y").toUpperCase(),
        avatarColor: "bg-primary",
      },
      content,
      timestamp: "Just now",
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [...(post.commentsList || []), newComment],
            }
          : post,
      ),
    );
  };

  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const toggleHashtag = (tag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: `p${Date.now()}`,
      author: {
        name: user?.username || "You",
        initials: (user?.username?.charAt(0) || "Y").toUpperCase(),
        role: (user?.roles?.[0] as "Parent" | "Specialist") || "Parent",
        avatarColor: "bg-primary",
      },
      content: newPost.trim(),
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      likedByMe: false,
      hashtags: selectedHashtags.length > 0 ? selectedHashtags : [],
      commentsList: [],
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
            onLike={handleLike}
            onAddComment={handleAddComment}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
}

export function Users() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return <div>{data}</div>;
}

export function Usersx() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return <div>{data}</div>;
}
