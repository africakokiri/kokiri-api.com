"use client";

import { addEndpoint } from "@/server/query";
import { FETCH_ENDPOINTS_QUERY_KEYS } from "@/tanstack-query/options/fetchEndpointsOptions";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddEndpointMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => await addEndpoint(formData),
    onSuccess: () => {
      const id = localStorage.getItem("id");

      if (!id) return;

      queryClient.invalidateQueries({
        queryKey: FETCH_ENDPOINTS_QUERY_KEYS.detail(id)
      });
    }
  });
};
