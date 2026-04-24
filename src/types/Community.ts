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
