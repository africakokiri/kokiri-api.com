"use client";

import { deleteEndpoint } from "@/server/query";
import { FETCH_ENDPOINTS_QUERY_KEYS } from "@/tanstack-query/options/fetchEndpointsOptions";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEndpointMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nanoid, path }: { nanoid: string; path: string }) =>
      await deleteEndpoint(nanoid, path),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: FETCH_ENDPOINTS_QUERY_KEYS.detail(variables.nanoid)
      });
    }
  });
};
