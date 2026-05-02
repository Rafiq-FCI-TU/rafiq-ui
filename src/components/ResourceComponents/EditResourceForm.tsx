import { X, Check } from "lucide-react";
import { useState } from "react";
import type { ResourcesCard } from "../../types/Resources";

interface EditResourceFormProps {
  resource: ResourcesCard;
  onSave: (
    resourceId: number,
    values: {
      title: string;
      link: string;
      description: string;
      tags: string[];
    },
  ) => void;
  onCancel: () => void;
}

export function EditResourceForm({
  resource,
  onSave,
  onCancel,
}: EditResourceFormProps) {
  const [title, setTitle] = useState(resource.title);
  const [link, setLink] = useState(resource.link);
  const [description, setDescription] = useState(resource.description);
  const [tags, setTags] = useState(resource.tags.join(", "));

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedLink = link.trim();
    const trimmedDesc = description.trim();
    if (
      !trimmedTitle ||
      !trimmedLink ||
      !trimmedDesc ||
      !trimmedLink.match(/^https?:\/\//)
    )
      return;
    const newTags = tags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);
    onSave(resource.id, {
      title: trimmedTitle,
      link: trimmedLink,
      description: trimmedDesc,
      tags: newTags,
    });
  };

  return (
    <div className="mb-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Resource title"
        className="w-full px-4 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all shadow-sm"
      />
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://example.com"
        className="w-full px-4 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all shadow-sm"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe this resource..."
        className="w-full px-4 py-3 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all resize-none shadow-sm"
        rows={3}
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
          disabled={
            !title.trim() ||
            !link.trim() ||
            !description.trim() ||
            !link.match(/^https?:\/\//)
          }
          className="cursor-pointer px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
        >
          <Check className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  );
}
