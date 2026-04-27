import { ExternalLink, AlertTriangle, Trash2, Calendar } from "lucide-react";
import { useState } from "react";
import type { ResourcesCard } from "../../types/Resources";
import type { User } from "../../contexts/AuthContext";
import { getInitials, getAvatarColor } from "../../lib/communityUtils";
import { PostMenu } from "../CommunityComponents/PostMenu";
import { EditResourceForm } from "./EditResourceForm";

interface ResourceCardProps {
  resource: ResourcesCard;
  onDelete: (resourceId: number) => void;
  onEdit: (
    resourceId: number,
    values: {
      title: string;
      link: string;
      description: string;
      tags: string[];
    },
  ) => void;
  currentUser: User | null;
}

export function ResourceCard({
  resource,
  onDelete,
  onEdit,
  currentUser,
}: ResourceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const authorInitials = getInitials(
    resource.author.firstName,
    resource.author.lastName,
  );
  const authorColor = getAvatarColor(resource.author.fullName);

  const isAuthor = currentUser?.id === resource.author.id;

  const handleDelete = () => {
    onDelete(resource.id);
    setShowDeleteConfirm(false);
  };

  const handleEdit = (
    resourceId: number,
    values: {
      title: string;
      link: string;
      description: string;
      tags: string[];
    },
  ) => {
    onEdit(resourceId, values);
    setIsEditing(false);
  };

  return (
    <article className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 ${authorColor} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm ring-2 ring-white`}
        >
          {authorInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 truncate text-[15px]">
              {resource.author.fullName}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(resource.createdAt).toLocaleDateString()}
          </p>
        </div>
        {isAuthor && (
          <PostMenu
            onEdit={() => setIsEditing(true)}
            onDelete={() => setShowDeleteConfirm(true)}
          />
        )}
      </div>

      {showDeleteConfirm && (
        <div className="mb-5 p-5 bg-red-50/80 rounded-2xl border border-red-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 ring-4 ring-red-50">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-red-900 mb-1">
                Delete this resource?
              </h4>
              <p className="text-sm text-red-700/80 mb-4 leading-relaxed">
                This action cannot be undone. The resource will be permanently
                removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all border border-gray-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="cursor-pointer px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-400 transition-all shadow-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        <EditResourceForm
          resource={resource}
          onSave={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {resource.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {resource.description}
            </p>
          </div>
          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-primary/5 text-primary/80 rounded-full text-xs font-medium border border-primary/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-xl transition-all border border-green-200"
            >
              <ExternalLink className="w-4 h-4" />
              Open Link
            </a>
          )}
        </>
      )}
    </article>
  );
}
