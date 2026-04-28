import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { Post, Comment, UserReaction } from "../types/Community";
import { useAuth } from "../contexts/AuthContext";
import { emptyReactionSummary } from "../lib/communityUtils";
import { useToast } from "./useToast";

const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api";

const REACTION_TO_TYPE: Record<NonNullable<UserReaction>, number> = {
  like: 1,
  love: 2,
  haha: 3,
  wow: 4,
  sad: 5,
  angry: 6,
};

function getReactionType(reaction: UserReaction): number | undefined {
  if (!reaction) return undefined;
  return REACTION_TO_TYPE[reaction];
}

export function useCommunity() {
  const { showToast } = useToast();
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
      const req = await fetch(`${API_BASE}/community/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();
      if (res.success === false) {
        throw new Error("Something Wrong Happened");
      }
      return res;
    },
  });

  const posts: Post[] = fetchedPosts?.data ?? [];

  // Edit post mutation with optimistic updates
  const editPostMutation = useMutation({
    mutationFn: async ({
      postId,
      content,
      tags,
    }: {
      postId: number;
      content: string;
      tags: string[];
    }) => {
      const res = await fetch(`${API_BASE}/community/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, tags }),
      });
      if (!res.ok) throw new Error("Failed to edit post");
      return res.json();
    },
    onMutate: async ({ postId, content, tags }) => {
      await queryClient.cancelQueries({ queryKey: ["Posts"] });
      const previousPosts = queryClient.getQueryData(["Posts"]);

      queryClient.setQueryData(
        ["Posts"],
        (old: { data?: Post[] } | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((post: Post) =>
              post.id === postId ? { ...post, content, tags } : post,
            ),
          };
        },
      );

      return { previousPosts };
    },
    onSuccess: () => {
      showToast("Post edited successfully", "success");
    },
    onError: (_err, _vars, context) => {
      showToast("Failed to edit post", "error");
      if (context?.previousPosts) {
        queryClient.setQueryData(["Posts"], context.previousPosts);
      }
    },
  });

  // Post reaction mutation with optimistic updates
  const postReactionMutation = useMutation({
    mutationFn: async ({
      postId,
      reaction,
    }: {
      postId: number;
      reaction: UserReaction;
    }) => {
      const type = getReactionType(reaction);
      if (type === undefined) throw new Error("Invalid reaction type");
      const res = await fetch(
        `${API_BASE}/community/posts/${postId}/reactions/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type }),
        },
      );
      if (!res.ok) throw new Error("Failed to toggle reaction");
      return res.json();
    },
    onMutate: async ({ postId, reaction }) => {
      await queryClient.cancelQueries({ queryKey: ["Posts"] });
      const previousPosts = queryClient.getQueryData(["Posts"]);

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

      return { previousPosts };
    },
    onError: (_err, _vars, context) => {
      showToast("Failed to update post reaction", "error");
      if (context?.previousPosts) {
        queryClient.setQueryData(["Posts"], context.previousPosts);
      }
    },
  });

  // Comment reaction mutation with optimistic updates
  const commentReactionMutation = useMutation({
    mutationFn: async ({
      commentId,
      reaction,
    }: {
      postId: number;
      commentId: number;
      reaction: UserReaction;
    }) => {
      const type = getReactionType(reaction);
      if (type === undefined) throw new Error("Invalid reaction type");
      const res = await fetch(
        `${API_BASE}/community/comments/${commentId}/reactions/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type }),
        },
      );
      if (!res.ok) throw new Error(`Failed to toggle reaction: ${res.status}`);
      return res.json();
    },
    onMutate: async ({ postId, commentId, reaction }) => {
      await queryClient.cancelQueries({ queryKey: ["Posts"] });
      const previousPosts = queryClient.getQueryData(["Posts"]);

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

      return { previousPosts };
    },
    onError: (_err, _vars, context) => {
      showToast("Failed to update comment reaction", "error");
      if (context?.previousPosts) {
        queryClient.setQueryData(["Posts"], context.previousPosts);
      }
    },
  });

  // Add comment mutation with optimistic updates
  const addCommentMutation = useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: number;
      content: string;
    }) => {
      const res = await fetch(
        `${API_BASE}/community/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        },
      );
      if (!res.ok) throw new Error("Failed to add comment");
      return res.json();
    },
    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["Posts"] });
      const previousPosts = queryClient.getQueryData(["Posts"]);

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

      return { previousPosts, tempId: newComment.id };
    },
    onSuccess: (data, variables, context) => {
      showToast("Comment added successfully", "success");
      queryClient.setQueryData(
        ["Posts"],
        (old: { data?: Post[] } | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((post: Post) =>
              post.id === variables.postId
                ? {
                    ...post,
                    comments: post.comments.map((c) =>
                      c.id === context?.tempId ? data.data || c : c,
                    ),
                  }
                : post,
            ),
          };
        },
      );
    },
    onError: (_err, variables, context) => {
      showToast("Failed to add comment", "error");
      queryClient.setQueryData(
        ["Posts"],
        (old: { data?: Post[] } | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((post: Post) =>
              post.id === variables.postId
                ? {
                    ...post,
                    commentsCount: post.commentsCount - 1,
                    comments: post.comments.filter(
                      (c) => c.id !== context?.tempId,
                    ),
                  }
                : post,
            ),
          };
        },
      );
    },
  });

  // Delete comment mutation with optimistic updates
  const deleteCommentMutation = useMutation({
    mutationFn: async ({
      commentId,
    }: {
      postId: number;
      commentId: number;
    }) => {
      const res = await fetch(`${API_BASE}/community/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },
    onMutate: async ({ postId, commentId }) => {
      await queryClient.cancelQueries({ queryKey: ["Posts"] });
      const previousPosts = queryClient.getQueryData(["Posts"]);

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
                    commentsCount: post.commentsCount - 1,
                    comments: post.comments.filter((c) => c.id !== commentId),
                  }
                : post,
            ),
          };
        },
      );

      return { previousPosts };
    },
    onSuccess: () => {
      showToast("Comment deleted successfully", "success");
    },
    onError: (_err, _vars, context) => {
      showToast("Failed to delete comment", "error");
      if (context?.previousPosts) {
        queryClient.setQueryData(["Posts"], context.previousPosts);
      }
    },
  });

  // Delete post mutation with optimistic updates
  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await fetch(`${API_BASE}/community/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["Posts"] });
      const previousPosts = queryClient.getQueryData(["Posts"]);

      queryClient.setQueryData(
        ["Posts"],
        (old: { data?: Post[] } | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((post: Post) => post.id !== postId),
          };
        },
      );

      return { previousPosts };
    },
    onSuccess: () => {
      showToast("Post deleted successfully", "success");
    },
    onError: (_err, _vars, context) => {
      showToast("Failed to delete post", "error");
      if (context?.previousPosts) {
        queryClient.setQueryData(["Posts"], context.previousPosts);
      }
    },
  });

  const handleReact = (postId: number, reaction: UserReaction) => {
    postReactionMutation.mutate({ postId, reaction });
  };

  const handleCommentReact = (
    postId: number,
    commentId: number,
    reaction: UserReaction,
  ) => {
    commentReactionMutation.mutate({ postId, commentId, reaction });
  };

  const handleAddComment = (postId: number, content: string) => {
    addCommentMutation.mutate({ postId, content });
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    deleteCommentMutation.mutate({ postId, commentId });
  };

  const handleEditPost = (
    postId: number,
    newContent: string,
    newTags: string[],
  ) => {
    editPostMutation.mutate({ postId, content: newContent, tags: newTags });
  };

  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  return {
    posts,
    isPending,
    error,
    user,
    handleReact,
    handleCommentReact,
    handleAddComment,
    handleDeleteComment,
    handleEditPost,
    handleDeletePost,
  };
}
