import { useAuth } from "../contexts/AuthContext";
import type { Post, Comment, UserReaction } from "../types/Community";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { emptyReactionSummary } from "../components/CommunityComponents/communityUtils";
import { CreatePostForm } from "../components/CommunityComponents/CreatePostForm";
import { PostsFeed } from "../components/CommunityComponents/PostsFeed";

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
    onError: (_err, _vars, context) => {
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
      console.log("Comment mutationFn called:", { commentId, reaction });
      const type = getReactionType(reaction);
      console.log("Sending type to API:", type);
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
      console.log("API response status:", res.status);
      if (!res.ok) throw new Error(`Failed to toggle reaction: ${res.status}`);
      const data = await res.json();
      console.log("API response data:", data);
      return data;
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
    onError: (err, vars, context) => {
      console.error("Comment reaction error:", err);
      console.error("Failed vars:", vars);
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
    onError: (_err, _vars, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["Posts"], context.previousPosts);
      }
    },
  });

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

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <CreatePostForm />
      <PostsFeed
        posts={posts}
        isPending={isPending}
        error={error}
        onReact={handleReact}
        onCommentReact={handleCommentReact}
        onAddComment={handleAddComment}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
        currentUser={user}
      />
    </div>
  );
}
