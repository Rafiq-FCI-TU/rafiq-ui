import type { User } from "../contexts/AuthContext";

export type UserReaction =
  | null
  | "like"
  | "love"
  | "haha"
  | "wow"
  | "sad"
  | "angry";

export interface ReactionSummary {
  total: number;
  types: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  userReaction: UserReaction;
}
export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  postedAgo: string;
  totalReactionsCount: number;
  author: Author;
  reactionSummary: ReactionSummary;
}
export interface Post {
  id: number;
  content: string;
  createdAt: string;
  postedAgo: string;
  tags: string[];

  totalReactionsCount: number;
  commentsCount: number;
  author: Author;
  reactionSummary: ReactionSummary;
  comments: Comment[];
}
export interface CommentProps {
  comment: Comment;
  onReact: (commentId: number, reaction: UserReaction) => void;
  onDelete?: (postId: number, commentId: number) => void;
  postId?: number;
  currentUser?: { id?: string } | null;
}
export interface CommentInputProps {
  currentUser: { username?: string } | null;
  onSubmit: (content: string) => void;
}

export interface ReactionsBreakdownProps {
  summary: ReactionSummary;
}
export interface FormValues {
  content: string;
  tags: string[];
}
export interface EditPostFormProps {
  post: Post;
  onSave: (content: string, tags: string[]) => void;
  onCancel: () => void;
}
export interface PostCardProps {
  post: Post;
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
export interface PostMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface PostsFeedProps {
  posts: Post[];
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

export interface ReactionButtonProps<T> {
  item: T;
  onReact: (itemId: number, reaction: UserReaction) => void;
  size?: "sm" | "md";
}
