import { X, Check } from "lucide-react";
import { useState } from "react";
import type { Post } from "../../types/Community";

interface EditPostFormProps {
  post: Post;
  onSave: (content: string, tags: string[]) => void;
  onCancel: () => void;
}

export function EditPostForm({ post, onSave, onCancel }: EditPostFormProps) {
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags.join(", "));

  const handleSave = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    const newTags = tags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);
    onSave(trimmed, newTags);
  };

  return (
    <div className="mb-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-3 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all resize-none shadow-sm"
        rows={4}
        placeholder="Edit your post..."
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full px-4 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all shadow-sm"
      />
      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 hover:bg-white rounded-lg transition-all flex items-center gap-1.5"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="cursor-pointer px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
        >
          <Check className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  );
}
