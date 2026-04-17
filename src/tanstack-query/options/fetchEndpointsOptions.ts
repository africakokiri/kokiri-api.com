"use client";

import { getEndpoints } from "@/server/query";

import { queryOptions } from "@tanstack/react-query";

export const FETCH_ENDPOINTS_QUERY_KEYS = {
  all: ["Endpoints"] as const,
  detail: (id: string) => [...FETCH_ENDPOINTS_QUERY_KEYS.all, id] as const
};

export const fetchEndpointsOptions = (id: string) => {
  return queryOptions({
    queryKey: FETCH_ENDPOINTS_QUERY_KEYS.detail(id),
    queryFn: async () => await getEndpoints(id),
    enabled: !!id
  });
};
