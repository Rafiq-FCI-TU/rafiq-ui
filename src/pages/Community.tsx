import { useAuth } from "../contexts/AuthContext";
import type { Post, Comment, UserReaction } from "../types/Community";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { emptyReactionSummary } from "../components/CommunityComponents/communityUtils";
import { CreatePostForm } from "../components/CommunityComponents/CreatePostForm";
import { PostsFeed } from "../components/CommunityComponents/PostsFeed";

export default function Community() {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: fetchedPosts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["Posts"],
    staleTime: 0,
    queryFn: async () => {
      const req = await fetch(
        `https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api/community/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await req.json();
      if (res.success === false) {
        throw new Error("Something Wrong Happened");
      }
      return res;
    },
  });

  const posts: Post[] = fetchedPosts?.data ?? [];

  const handleReact = (postId: number, reaction: UserReaction) => {
    queryClient.setQueryData(
      ["Posts"],
      (old: { data?: Post[] } | undefined) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((post: Post) => {
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
        };
      },
    );
  };

  const handleCommentReact = (
    postId: number,
    commentId: number,
    reaction: UserReaction,
  ) => {
    queryClient.setQueryData(
      ["Posts"],
      (old: { data?: Post[] } | undefined) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((post: Post) => {
            if (post.id !== postId) return post;
            return {
              ...post,
              comments: post.comments.map((comment: Comment) => {
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
        };
      },
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

    queryClient.setQueryData(
      ["Posts"],
      (old: { data?: Post[] } | undefined) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((post: Post) =>
            post.id === postId
              ? {
                  ...post,
                  commentsCount: post.commentsCount + 1,
                  comments: [...post.comments, newComment],
                }
              : post,
          ),
        };
      },
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <CreatePostForm />
      <PostsFeed
        posts={posts}
        isPending={isPending}
        error={error}
        onReact={handleReact}
        onCommentReact={handleCommentReact}
        onAddComment={handleAddComment}
        currentUser={user}
      />
    </div>
  );
}
