import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { ResourcesCard } from "../types/Resources";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "./useToast";

const API_BASE =
  "https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api";

export function useResources() {
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: fetchedResources,
    isPending,
    error,
  } = useQuery({
    queryKey: ["Resources"],
    staleTime: 0,
    queryFn: async () => {
      const req = await fetch(`${API_BASE}/resources`, {
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

  const resources: ResourcesCard[] = fetchedResources?.data ?? [];

  const deleteResourceMutation = useMutation({
    mutationFn: async (resourceId: number) => {
      const res = await fetch(`${API_BASE}/resources/${resourceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete resource");
      return await res.json();
    },
    onMutate: async (resourceId) => {
      await queryClient.cancelQueries({ queryKey: ["Resources"] });
      const previousResources = queryClient.getQueryData(["Resources"]);

      queryClient.setQueryData(
        ["Resources"],
        (old: { data?: ResourcesCard[] } | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter(
              (resource: ResourcesCard) => resource.id !== resourceId,
            ),
          };
        },
      );

      return { previousResources };
    },
    onSuccess: () => {
      showToast("Resource deleted successfully", "success");
    },
    onError: (_err, _vars, context) => {
      if (context?.previousResources) {
        queryClient.setQueryData(["Resources"], context.previousResources);
      }
      showToast("Failed to delete resource", "error");
    },
  });

  const createResourceMutation = useMutation({
    mutationFn: async (values: {
      title: string;
      link: string;
      description: string;
      tags: string[];
    }) => {
      const req = await fetch(`${API_BASE}/resources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      const res = await req.json();
      if (res.success === false) throw new Error("Failed to create resource");
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Resources"] });
      showToast("Resource created successfully", "success");
    },
    onError: () => {
      showToast("Failed to create resource", "error");
    },
  });

  const editResourceMutation = useMutation({
    mutationFn: async ({
      resourceId,
      ...values
    }: {
      resourceId: number;
      title: string;
      link: string;
      description: string;
      tags: string[];
    }) => {
      const res = await fetch(`${API_BASE}/resources/${resourceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to edit resource");
      return await res.json();
    },
    onMutate: async ({ resourceId, ...values }) => {
      await queryClient.cancelQueries({ queryKey: ["Resources"] });
      const previousResources = queryClient.getQueryData(["Resources"]);

      queryClient.setQueryData(
        ["Resources"],
        (old: { data?: ResourcesCard[] } | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((resource: ResourcesCard) =>
              resource.id === resourceId
                ? { ...resource, ...values }
                : resource,
            ),
          };
        },
      );

      return { previousResources };
    },
    onSuccess: () => {
      showToast("Resource updated successfully", "success");
    },
    onError: (_err, _vars, context) => {
      if (context?.previousResources) {
        queryClient.setQueryData(["Resources"], context.previousResources);
      }
      showToast("Failed to update resource", "error");
    },
  });

  const handleDeleteResource = (resourceId: number) => {
    deleteResourceMutation.mutate(resourceId);
  };

  const handleCreateResource = async (values: {
    title: string;
    link: string;
    description: string;
    tags: string[];
  }) => {
    await createResourceMutation.mutateAsync(values);
  };

  const handleEditResource = (
    resourceId: number,
    values: {
      title: string;
      link: string;
      description: string;
      tags: string[];
    },
  ) => {
    editResourceMutation.mutate({ resourceId, ...values });
  };

  return {
    resources,
    isPending,
    error,
    user,
    handleDeleteResource,
    handleCreateResource,
    handleEditResource,
  };
}
