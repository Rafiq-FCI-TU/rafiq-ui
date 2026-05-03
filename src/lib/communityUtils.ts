import type { UserReaction, ReactionSummary } from "../types/Community";

export const REACTIONS: {
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

export const AVATAR_COLORS = [
  "bg-rose-400",
  "bg-amber-400",
  "bg-teal-400",
  "bg-blue-400",
  "bg-violet-400",
  "bg-pink-400",
];

export interface Reactionable {
  reactionSummary: ReactionSummary;
}

export function emptyReactionSummary(): ReactionSummary {
  return {
    total: 0,
    types: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
    userReaction: null,
  };
}

export function getInitials(firstName: string, lastName: string): string {
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
}

export function getAvatarColor(fullName: string): string {
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
