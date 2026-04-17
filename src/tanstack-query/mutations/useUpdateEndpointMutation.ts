"use client";

import { updateEndpoint } from "@/server/query";
import { FETCH_ENDPOINTS_QUERY_KEYS } from "@/tanstack-query/options/fetchEndpointsOptions";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type MutationFnProps = {
  id: string;
  oldPath: string;
  newPath: string;
};

export const useUpdateEndpointMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, oldPath, newPath }: MutationFnProps) =>
      await updateEndpoint(id, oldPath, newPath),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({
        queryKey: FETCH_ENDPOINTS_QUERY_KEYS.detail(variables.id)
      }),
    onError: () => {
      toast.error("");
    }
  });
};
