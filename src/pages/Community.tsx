import { CreatePostForm } from "../components/CommunityComponents/CreatePostForm";
import { PostsFeed } from "../components/CommunityComponents/PostsFeed";
import { useCommunity } from "../hooks/useCommunity";

export default function Community() {
  const {
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
  } = useCommunity();

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
        onDeleteComment={handleDeleteComment}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
        currentUser={user}
      />
    </div>
  );
}
