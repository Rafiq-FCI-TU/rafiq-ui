import { LoaderCircle, StickyNote, XCircle} from "lucide-react";
import type { Post as PostType, UserReaction } from "../../types/Community";
import type { User } from "../../contexts/AuthContext";
import { PostCard } from "./Post";

interface PostsFeedProps {
  posts: PostType[];
  isPending: boolean;
  error: Error | null;
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

export function PostsFeed({
  posts,
  isPending,
  error,
  onReact,
  onCommentReact,
  onAddComment,
  onDeleteComment,
  onEditPost,
  onDeletePost,
  currentUser,
}: PostsFeedProps) {
  if (isPending) {
    return (
      <div className="flex items-center justify-center flex-col gap-3 h-[calc(100vh/2-100px)]">
        <LoaderCircle className="animate-spin size-10 text-primary" />
        <span className="text-lg font-medium text-gray-500">
          Wait, Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-red-500 h-[calc(100vh/2-100px)]">
        <XCircle className="size-10" />
        <span className="text-lg font-bold">{error.message}</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-gray-500 h-[calc(100vh/2-100px)]">
        <StickyNote className="size-10" />
        <span className="text-lg font-medium">No posts available yet.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onReact={onReact}
          onCommentReact={onCommentReact}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
