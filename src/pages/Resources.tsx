import { Library as LibraryIcon, Loader2, AlertCircle } from "lucide-react";
import { ResourceCard } from "../components/ResourceComponents/ResourceCard";
import { CreateResourceForm } from "../components/ResourceComponents/CreateResourceForm";
import { useResources } from "../hooks/useResources";

export default function Library() {
  const {
    resources,
    isPending,
    error,
    user,
    handleDeleteResource,
    handleCreateResource,
    handleEditResource,
  } = useResources();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <AlertCircle className="w-10 h-10 mb-3" />
        <p className="text-sm">Failed to load resources.</p>
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <LibraryIcon className="w-10 h-10 mb-3" />
        <p className="text-sm">No resources available yet.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <CreateResourceForm onCreate={handleCreateResource} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onDelete={handleDeleteResource}
            onEdit={handleEditResource}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
}
