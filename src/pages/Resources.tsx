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

  return (
    <div className="p-5">
      <CreateResourceForm onCreate={handleCreateResource} />
      {isPending ? (
        <div className="flex items-center justify-center flex-col py-20">
          <Loader2 className="size-10 text-primary animate-spin" />
          <p className="text-sm">Loading resources...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <AlertCircle className="size-10 mb-3" />
          <p className="text-sm">Failed to load resources.</p>
        </div>
      ) : resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <LibraryIcon className="size-10 mb-3" />
          <p className="text-sm">No resources available yet.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
